import { getZoomedRatio, Point, SIDE_LENGTH } from "./frontend-utils";
import Log from "../src/Util";
import { Piece, PieceRole } from './ChessPiece'

class Board {

    intersections: Array<Array<any>>;


    //how to get ratio : https://www.jianshu.com/p/6db40c482899
    ratio: number; //current ratio of the board
    side_length: number; //current sidelength in 'px'

    image?: HTMLImageElement;

    //invokes functions in Piece and Point simutaniously
    public movePieceFromSrcToDest(piece: Piece, point_source: Point, point_dest: Point) {

        point_source.setPiece(null);  //the piece is moving out to another grid, so it's set to null.
        piece.moveToPoint(point_dest);// the piece now knows which new place it's in
        point_dest.setPiece(piece);   // the point the piece moves in knows which piece it's receiving.
    }

    //get a specific point from coordinates
    public getPointFromCoordinates(x_coor: number, y_coor: number) {
        return this.intersections[x_coor - 1][y_coor - 1]
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

    constructor() {

        this.ratio = 100; //default ratio 100%
        this.side_length = this.ratio * 0.01 * SIDE_LENGTH;

        //A.K.A points.
        this.intersections = new Array<Array<any>>();


        for (let i = 0; i < 9; i++) {
            this.intersections[i] = [];
            for (let j = 0; j < 10; j++) {

                // 1 2 3 4 5 6 7 8 9
                // 2
                // 3
                // 4
                // 5

                // 6
                // 7
                // 8
                // 9
                // 10

                this.intersections[i][j] = (new Point((i+1), (j+1)));
            }
        }
    }

    detachPieceFromGrid() {
        Log.trace('detachPieceFromGrid()');
        Log.trace('detach some piece from some grid');
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
        console.log('ratio')
        console.log(ratio)
        console.log(this.ratio)


    }

    render() {
        let board = $('#board');


        $(board).css('height', 'fit-content');

        $("#id_chessboard").css("position", "fixed");
        $("#id_chessboard").css("max-height", '100vh');

        // $("#board").css("left", "0px");
        $("#id_chessboard").css("margin", "0");
        $("#id_chessboard").css("padding", "0vw");


        $("#board").css('margin-left', 'auto');
        $("#board").css('margin-right', 'auto');

        $("#board").css('padding', 0);

        //for testing purposes, added some color to the background
        $('.className_grid_div').css('background-color', 'rgba(255,0,0,0.3)')



        $(window).resize(function () {
            let board = $('#board')

            $.when()
                .then(() => {

                    board.css('width', board.css('height'))
                    board.css('height', board.css('width'))

                })
                .then(() => {
                    $('.className_grid_div').css('width', parseInt(board.css('width')) / 11)
                    $('.className_grid_div').css('height', parseInt(board.css('height')) / 10)
                    $('.className_grid_div').css('z-index', 10)
                    $('.className_grid_div').css('margin', 0)
                })
                .then(() => {
                    $('.pieces').css('width', parseInt($('.className_grid_div').css('width')) / 2)
                    $('.pieces').css('height', parseInt($('.className_grid_div').css('width')) / 2)
                })
                .then(() => {
                    board.css('max-width', board.css('height'))
                })




        });




        $("#board").css("max-width", "100vh");
    }
}


export {
    Board
}