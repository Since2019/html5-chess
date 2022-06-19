import { fitSize, getZoomedRatio, Point, SIDE_LENGTH } from "./frontend-utils";
import { Piece, PieceRole, PlayerColor } from './ChessPieces/ChessPiece'

import { Game } from './Game'

import { FenNotation } from "./utils/FenNotation"
import { wsClient } from './utils/WebSocketConnection'
import { socketIoClient } from "./utils/SocketIoClient"

// 棋盘
class Board {

    intersections: Array<Array<any>>;


    //how to get ratio : https://www.jianshu.com/p/6db40c482899
    ratio: number; //current ratio of the board
    side_length: number; //current sidelength in 'px'

    image?: HTMLImageElement;

    active_piece?: Piece;

    target_coordinate: number[];

    game: Game;

    moves: number;

    half_move_counter: number;

    full_move_counter: number;


    constructor(game: Game) {
        // 游戏和棋盘要耦合
        this.game = game;

        // 缩放相关
        this.ratio = 100; //default ratio 100%
        this.side_length = this.ratio * 0.01 * SIDE_LENGTH;

        // 玩家选择的下一个位置
        this.target_coordinate = [-1, -1]

        //A.K.A points.
        this.intersections = new Array<Array<any>>();

        this.moves = 0;
        this.half_move_counter = 0;
        this.full_move_counter = 1;

        for (let i = 0; i < 9; i++) {
            this.intersections[i] = [];
            for (let j = 0; j < 10; j++) {


                // UCCI坐标

                //     a b c d e f g h i

                // (9) 1 2 3 4 5 6 7 8 9
                // (8) 2
                // (7) 3
                // (6) 4
                // (5) 5

                // (4) 6
                // (3) 7
                // (2) 8
                // (1) 9
                // (0) 10

                this.intersections[i][j] = (new Point((i + 1), (j + 1)));
            }
        }
    }


    //invokes functions in Piece and Point simutaniously
    public movePieceFromSrcToDest(piece: Piece, point_source: Point, point_dest: Point) {

        point_source.setPiece(null);  //the piece is moving out to another grid, so it's set to null.
        piece.moveToPoint(point_dest);// the piece now knows which new place it's in
        point_dest.setPiece(piece);   // the point the piece moves in knows which piece it's receiving.
    }

    //get a specific point from coordinates
    public getPointFromCoordinates(x_coor: number, y_coor: number) {
        if (!this.validateXCoordinate(x_coor) || !this.validateYCoordinate(y_coor))
            return null;
        return this.intersections[x_coor - 1][y_coor - 1];
    }

    // 从HTML Element的ID中获取坐标
    public getCoordinateFromElemId(id: string) {
        // grid_div_5_6
        console.log(id)
        let split_arr = id.split('_');

        let coor_x = split_arr[2];
        let coor_y = split_arr[3];

        return [parseInt(coor_x), parseInt(coor_y)]

    }

    // Check for valid x coordinate
    private validateXCoordinate(x: number): boolean {
        return x >= 1 && x <= 9;
    }

    // Check for valid y coordinate
    private validateYCoordinate(y: number): boolean {
        return y >= 1 && y <= 10;
    }

    //get a row from y_coor(nth row)
    public getRowFromYCoordinate(y_coor: number) {
        let row = []
        for (let i = 0; i < 9; i++) {
            row.push(this.intersections[i][y_coor - 1])
        }
        return row;
    }

    //get a column from x_coor(nth col)
    public getColFromXCoordinate(x_coor: number) {
        let col = []
        for (let j = 0; j < 10; j++) {
            col.push(this.intersections[x_coor - 1][j])
        }
        return col;
    }



    // 获取局面字符串
    private getPiecePlacementString() {
        console.log("Getting Piece Placement:");
        let ret_string = ""

        for (let row = 0; row <= 9; row++) { // 10行
            let row_arr = this.getRowFromYCoordinate(row + 1);
            let empty_points = 0

            for (let point of row_arr) {
                // 坐标中有棋子
                if (point.piece) {
                    if (empty_points != 0) {
                        ret_string += empty_points + '';
                        empty_points = 0;
                    }
                    ret_string += point.piece.piece_role;
                }
                // 
                else {
                    empty_points++;
                }
            }

            if (row != 9) {
                if (empty_points != 0) {
                    ret_string += empty_points + ''
                }
                ret_string += '/';
            }


        }
        // 
        console.log(ret_string);
        return ret_string;
    }


    private getActiveColor(): string {
        if (this.active_piece) {
            console.log("this.active_piece.getColor().toString()", this.active_piece.getColor().toString());
            console.log("PlayerColor.RED", PlayerColor.RED);
            // 当前的棋子是红，那么下一步轮到黑走，所以这里反过来的
            return this.active_piece.getColor() === PlayerColor.RED ? 'b' : 'w';
        }
        else
            return "w"
    }




    public increaseHalfMovementCount() {
        this.half_move_counter++;

    }


    public increaseFullMoveCount() {
        // TODO:   write a full move counter updater
        this.full_move_counter++;
    }




    /**
     * 
     * @returns the FEN notation, for the use of chess engines
     */
    public getFenString() {
        return new FenNotation(
            this.getPiecePlacementString(),
            this.getActiveColor(),
            this.half_move_counter,
            this.full_move_counter)
            .getFenNotation()
    }


    public sendFenNotationToServer() {
        // wsClient.send(`{ "fen_string" : "${this.getFenString()}" }`);
        socketIoClient.emit("fen_string", this.getFenString());

        socketIoClient.on("bestmove", (data: any) => {
            console.log("socketIoClient bestmove data");
            console.log(data);


            const from_x_coor = Point.UcciXCoorMap.get(data[0]);
            const from_y_coor = Point.UcciYCoorMap.get(data[1]);
            if (from_x_coor != undefined && from_y_coor != undefined) {
                console.log(this.getPointFromCoordinates(from_x_coor, from_y_coor));
            }



        });

        // console.log("sending FenNotation To Server")

        // const Http = new XMLHttpRequest();
        // const url = 'http://localhost:4321/ai/fen/position';
        // Http.open("POST", url);

        // Http.setRequestHeader("Accept", "application/json");
        // Http.setRequestHeader("Content-Type", "application/json");



        // Http.send(`{ "fen_string" : "${this.getFenString()}" }`);


        // Http.onreadystatechange = (e) => {
        //     console.log("服务器返还运算结果");
        //     console.log(Http.responseText);

        //     let start_pos_x = Http.responseText[0];
        //     let start_pos_y = Http.responseText[1];
        //     let end_pos_x = Http.responseText[2];
        //     let end_pos_y = Http.responseText[3];

        //     // HACK: Had to use static for UCCIXCOORMAP properties
        //     let interpreted_pos_x =  Point.UcciXCoorMap.get(start_pos_x);
        //     let interpreted_pos_y = Point.UcciYCoorMap.get(start_pos_y);
        // }

        // console.log(this.getFenString());
    }




    detectZoom() {
        let ratio = 0;
        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        }

        // ???? not working, why?

        // else if (~ua.indexOf('msie')) {
        //     if (screen.deviceXDPI && screen.logicalXDPI) {
        //         ratio = screen.deviceXDPI / screen.logicalXDPI;
        //     }
        // }
        else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
        }
        if (ratio) {
            ratio = Math.round(ratio * 100);
        }

        this.ratio = ratio;
    }

    render() {
        let board = $('#board');

        // $(board).css('height', 'fit-content');

        $("#id_chessboard").css("position", "fixed");
        $("#id_chessboard").css("max-height", '100vh');

        // $("#board").css("left", "0px");
        $("#id_chessboard").css("margin", "0");
        $("#id_chessboard").css("padding", "0vw");


        board.css('margin-left', 'auto');
        board.css('margin-right', 'auto');

        board.css('padding', 0);

        //for testing purposes, added some color to the background
        $('.className_grid_div').css('background-color', 'rgba(255,0,0,0.3)');

        //fits the size when resizing
        $(window).on('resize', function () {
            fitSize();
        });

        //fixed the size issue upon entry
        $(document).on('ready', () => {
            fitSize();
        });

        $("#board").css("max-width", "100vh");
    }
}


export {
    Board
}