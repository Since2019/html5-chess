import { Console } from "console";
import Log from "../../../src/Util";
import { Board } from "../Boards";
import { getZoomedRatio, getChessBoardSize, Point, SIDE_LENGTH, PlayerColor } from "../frontend-utils";

import { FenNotation } from "../utils/FenNotation"


// used in class Piece
// 棋子颜色
// enum PlayerColor {
//     'BLACK',
//     'RED'
// }

// used in class Game, 
// 玩家颜色
// enum PlayerColor {
//     'BLACK',
//     'RED'
// }

// 棋子类型
var PieceRole = {
    General: 'King',
    Advisor: 'Advisor',
    WarElephant: 'Bishop',
    Chariot: 'Rook',
    Cavalry: 'Night', // Knight
    Cannon: 'Cannon',
    Soldier: 'Pawn',
}


abstract class Piece {
    // TODO : Lacking of a function that does valid position check

    protected board: Board; // 棋盘ptr

    protected active: boolean; // 是否处于被选中状态 
    // protected has_moved: boolean; // 已经移动了？
    protected side_length: number; // 棋子边长
    protected ratio: number;       //
    protected point: Point;        // 现在所处的位置

    protected piece_role!: string;
    protected color: PlayerColor;

    protected elem: HTMLImageElement;
    protected state: number;

    protected piece_role_dict = {
        General: 'King',
        Advisor: 'Advisor',
        WarElephant: 'Bishop',
        Chariot: 'Rook',
        Cavalry: 'Night', // Knight
        Cannon: 'Cannon',
        Soldier: 'Pawn',
    }


    constructor(point: Point, board: Board, role: string, color: PlayerColor) {
        // 与移动相关      
        this.point = point;                                  // 被置于某个点
        // this.has_moved = false;                           // 是否已经被移动
        this.active = false;                                 // 是否被选中


        // 与棋子属性相关
        this.board = board;                                  // 所在的棋盘
        this.color = color;                                  // 棋子颜色

        // FEN Notation 当中，小写表示黑方，大写表示红方
        if (this.color == PlayerColor.RED) {
            this.piece_role = role[0].toUpperCase();
        }
        else if (this.color == PlayerColor.BLACK) {
            this.piece_role = role[0].toLowerCase();
        }

        // 棋子的数据和显示是分开的 HTML Element
        this.elem = document.createElement("img");

        // 与棋子大小有关
        this.ratio = 100;                                    // TODO:放大倍率 ?
        this.side_length = this.ratio * 0.01 * SIDE_LENGTH;  // 棋子的边长


        // 0 -> not selected
        // 1 -> selected, not moved
        // 2 -> moved, refesh state to 0
        this.state = 0;

        // this.fenNotation = new FenNotation()

        $(window).on('mousedown', (e) => {
            e.preventDefault(); //get rid of non-game experience (selecting pictures and stuff)
        })

        $(window).on('change', (e) => {
            e.preventDefault(); //get rid of non-game experience (selecting pictures and stuff)
            console.log('changed')
        })

        // 运行这个，就会把所有的Listener都加上
        this.listenerManager();

    }

    private listenerManager() {


        this.attachSelectPieceListener()
        // this.attachMoveToGridListener()
        // this.removeMoveToGridListener()

    }

    /** 
     *  I. When the player clicks on a piece,
     *  The listener invokes the method to determine movable grids,
     *  then it highlights all the grids
     */
    private attachSelectPieceListener() {


        // console.log("attachSelectPieceListener, check active:")
        console.log(this.board.active_piece)
        // TODO：需要写一个逻辑，判断是否之前已经点过一个棋子

        // 点击了棋子的img之后
        $(this.elem).on('click', (e) => {

            if (this.board.active_piece &&
                this.board.active_piece != this) {
                console.log("之前选中了其他的棋子");

                if (this.board.active_piece && this.getCurrentPlayer() == this.color) {
                    this.board.active_piece.active = false;
                    this.board.active_piece = undefined;

                    return;
                }

            }
            else {
                console.log('新点击了棋子：');
                console.log(this.piece_role);
                console.log(this.elem);

                e.preventDefault();

                // 1. clearing all the colored background first:
                $('.className_grid_div').css('background', 'rgba(3, 181, 252,0.0)')


                // 2. put all the movalbe positions into an array
                let movable_points = []
                movable_points = this.movablePoints();
                // console.log(movable_points)


                // 3. highlight all the movalbe positions
                // If the currentPlayer's color is the same as the piece color   
                if (this.getCurrentPlayer() == this.color) {
                    movable_points.forEach(point => {
                        $(point.elem).css('background', 'rgba(3, 181, 252,0.5')
                    });
                }



                // 设置自己被选中，告知棋盘选中的是自己
                this.active = true;
                this.board.active_piece = this;


                // TODO:找到ListenerManager的问题所在，并且把这个移动到那里面。
                // 下一步是Move To Grid
                setTimeout(() => {
                    this.attachMoveToGridListener()
                }, 100);
            }



        })




    }

    /**
     *  The user has selected a piece in step I.
     * 
     *  II. once the user has selected the piece,
     *  a listener is attached to the grid to check 
     *  which grid the user is moving to
     * 
     *  
     *  在I中玩家已经选择了棋子 
     * 
     *  II.
     *  在用attachSelectPieceListener()选择了棋子之后,
     *  再用attachMoveToGridListener() 选择移动到哪个格子
     */
    private attachMoveToGridListener() {

        console.log(this.point);
        //1. attach another listener which listens to the next click:
        $('.className_grid_div').on('click', (e) => {

            console.log("点击了棋子:")
            console.log(e.target)
            console.log(e.target.tagName)

            console.log(`棋子所在的格子:`)
            console.log(e.target.parentNode)
            console.log(e.target.parentElement)



            // ① if the piece is selected, then go on and see if the grid is moveable
            // ① 如果已经选择了某个棋子，判断是否能够走
            if (this.board.active_piece &&                               // Condition #1 : 选中了棋子
                this.board.game.getCurrentPlayer() == this.color) {       // Condition #2 : 是当前玩家走

                console.log('the piece is selected?' + this.active);
                console.log(`active piece:`);

                console.log(this.board.active_piece);
                console.log(this.board.target_coordinate)

                // 如果点击的是棋子，而不是空的格子
                // 判断条件：HTML元素是IMG而不是DIV
                if ((e.target.tagName).toUpperCase() == 'IMG') {

                    console.log("点击了另一个棋子")
                    let parentNode = e.target.parentElement


                    if (parentNode != null) {
                        console.log("棋子所在的格子：")
                        console.log(parentNode)
                        // 记录下一步要走的坐标
                        this.board.target_coordinate = this.board.getCoordinateFromElemId(parentNode.id);
                    }

                }
                else {
                    console.log("点击了一个空的格子")
                    this.board.target_coordinate = this.board.getCoordinateFromElemId(e.target.id);
                }


                console.log(this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1]))

                let target_point = this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1])

                // 可以走的点不存在于这个Array上
                if (!this.movablePoints().includes(target_point)) {
                    console.log("不能这么走！！！")
                    return
                }



                // ①.a 如果不是 [-1, -1], 说明玩家选择了某个格子
                if (this.board.target_coordinate[0] != -1 && this.board.target_coordinate[1] != -1) {

                    // 增加一个判断条件，看这个位置是否有棋子
                    // TODO: check if the point's 'piece' key is available at all?
                    if (this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1]).hasPiece()) {

                        // console.log("=========================== debug =================================")
                        // console.log("该点有棋子")
                        // console.log(this.isFriendly(this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1]).getPiece()))

                        // 棋子是自己人的
                        // 那么选中的棋子则换为该棋子
                        if (this.isFriendly(this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1]).getPiece())) {
                            alert("You Can't Move Here, A Friendly Piece is at this Position")
                            this.removeMoveToGridListener()

                            return //直接结束

                        }
                        // 不是自己人的，要提子
                        // TODO:增加提子逻辑
                        else if (!this.isFriendly(this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1]).getPiece())) {
                            // alert("正在提子")

                            // 目标Point中移除piece
                            delete this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1]).piece

                            console.log("=========  debug ===========")
                            console.log(this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1]))


                            // 目标Point.elem 移除 HTML元素
                            this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1]).elem.innerHTML = '';

                        }
                        else {
                            // 目标Point中移除piece
                            delete this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1]).piece

                            // console.log("=========  debug ===========")
                            // console.log(this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1]))

                            // 目标Point.elem 移除 HTML元素
                            this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1]).elem.innerHTML = '';
                        }




                    }
                    // 
                    else {
                        this.board.getPointFromCoordinates(this.board.target_coordinate[0], this.board.target_coordinate[1]).elem.innerHTML = '';
                    }

                    console.log(this.board.target_coordinate);
                    let next_x_coor = this.board.target_coordinate[0]
                    let next_y_coor = this.board.target_coordinate[1]


                    // 棋子属性、Element移动到目标点, 详见moveToPoint
                    this.board.active_piece.moveToPoint(this.board.getPointFromCoordinates(next_x_coor, next_y_coor));
                    $('.className_grid_div').css('background', 'rgba(0,0,0,0.0)') // setting back the background to non-colored and transparent





                    this.board.target_coordinate = [-1, -1] // 重新归[-1, -1]
                    this.active = false;                   // 棋子状态为不再选中

                    // TODO >>>>>  Remove if not needed anymore <<<<<<<<<
                    // console.log('the piece is selected?' + this.active);
                    // console.log(`active piece:`);
                    // console.log(this.board.active_piece);
                    // console.log(this.board.target_coordinate )

                    this.board.game.alternatePlayer();     // 切换到下一个玩家
                }

            }

            // ② 还没有选中棋子
            else {
                console.log("还没有选择棋子......")
                console.log('Is the piece is selected? ' + this.active);
                console.log('Doing nothing...');

                $('.className_grid_div').css('background', 'rgba(0,0,0,0.0)') // setting back the background to non-colored and transparent

            }



            this.removeMoveToGridListener()
            // $('.className_grid_div').unbind('click');  // HACK after clicking, we need to get rid of the listener
            // $('.className_grid_div').css('background', 'rgba(0,0,0,0.0)') // setting back the background to non-colored and transparent
        })


    }

    //upon finishing the listener, it removes the listener from the grid
    private removeMoveToGridListener() {
        this.board.active_piece = null as any;
        //4. remove the click listener from the grids
        console.log('已经点击了移动目标格,现在移除MoveToGridListener')

        $('.className_grid_div').off('click');  // after clicking, we need to get rid of the listener
        $('.className_grid_div').css('background', 'rgba(0,0,0,0.0)') // setting back the background to non-colored and transparent
    }

    // 可以走的点
    public movablePoints(): Point[] {
        Log.trace('movable points of a piece')
        return []
    }

    protected getElement(): HTMLImageElement {
        return this.elem;
    }

    //sets the point of the piece
    public moveToPoint(point: Point) {

        try {
            // 删除原来的html元素
            console.log("removing child ", this.elem , "from " , this.board.intersections[this.point.x_coor - 1][this.point.y_coor - 1].elem)
            this.board.intersections[this.point.x_coor - 1][this.point.y_coor - 1].elem.removeChild(this.elem);
            delete this.board.intersections[this.point.x_coor - 1][this.point.y_coor - 1].piece;

            // 更换到新的点
            this.point = point;
            console.log("appending child ", this.elem , "from " , this.board.intersections[this.point.x_coor - 1][this.point.y_coor - 1].elem)
            $(this.elem).css("z-index",-1);
            this.board.intersections[this.point.x_coor - 1][this.point.y_coor - 1].elem.appendChild(this.elem);
            this.board.intersections[this.point.x_coor - 1][this.point.y_coor - 1].piece = this
        }
        catch (e) {
            console.error(e)
        }


        // this.board.getFenString();


        this.board.sendFenNotationToServer();

        this.board.increaseFullMoveCount();

        console.log("当前的FEN string:", this.board.getFenString());
    }


    // ========= Getter & Setters =========================================

    /** 
     * 获取棋子的类型
     * Get Piece Role
     */
    public getRole(): string {
        return this.piece_role;
    }

    /** 
     * 获取棋子的颜色
     * Get Piece Color
     */
    public getColor(): PlayerColor {

        return this.color;

    }

    public getCurrentPlayer(): PlayerColor {
        return this.board.game.getCurrentPlayer()
    }
    // 

    // ------------------ 下一目标点 ------------------------
    // 目标点的坐标
    public getTargetPointCoordinate() {
        return this.board.target_coordinate
    }

    // 获得目标点的 X 坐标
    public getTargetPointXCoordinate() {
        return this.board.target_coordinate[0]
    }

    // 获得目标点的 Y 坐标
    public getTargetPointYCoordinate() {
        return this.board.target_coordinate[1]
    }





    /**
     * @param dest The destination point we are moving to
     * @returns A boolean to indicate if it's a valid move or not
     */
    public abstract canMove(dest: Point): boolean;

    /**
     * @param point Check if a point has a piece with the same side
     * 
     */
    protected checkSameColorPieceInPoint(point: Point): boolean {
        const piece = point.getPiece();
        if (!piece) {
            return false;
        }

        return piece.getColor() === this.color;
    }


    /**
    * @param point Check if a point has a piece with the same side 
    *              判断传入的参数中的该枚棋子是否是友军
    */
    protected isFriendly(piece: Piece): boolean {
        // console.log(piece)

        try {
            if (!piece) {

                console.log("没有棋子！")

            }
            // FIXME：PROBLEM
            return piece.getColor() === this.color;
        }
        catch (e) {
            console.log("没有棋子！")
        }
        return true;

    }

    protected isEnemy(piece: Piece): boolean {
        if (!piece) {
            return false;
        }
        return piece.getColor() != this.color;
    }

    // 调整棋盘、棋子的大小
    private static adjustResize: () => void = () => {

        if (screen.width == window.innerWidth) {
            console.log("at exact 100%");

            getChessBoardSize(); // 判断棋盘的大小

            $('.className_grid_div').css('width', SIDE_LENGTH * (getZoomedRatio() / 100))    // 更新棋盘的宽度
            $('.className_grid_div').css('height', SIDE_LENGTH * (getZoomedRatio() / 100))   // 更新棋盘的高度
            $('.pieces').css('width', SIDE_LENGTH * (getZoomedRatio() / 100))                // 更新棋子的高度
            $('.pieces').css('height', SIDE_LENGTH * (getZoomedRatio() / 100))               // 更新棋子的宽度

            $("#board").css("width", $("#board").css('height'));
            $("#id_chessboard").css("width", $("#board").css('width'))                       // 棋盘的宽度和高度统一 


        } else if (screen.width > window.innerWidth) {
            console.log("you have zoomed in the page i.e more than 100%");
            getZoomedRatio();
            getChessBoardSize();
            $('.className_grid_div').css('width', SIDE_LENGTH * (getZoomedRatio() / 100));
            $('.className_grid_div').css('height', SIDE_LENGTH * (getZoomedRatio() / 100));
            $('.pieces').css('width', SIDE_LENGTH * (getZoomedRatio() / 100));
            $('.pieces').css('height', SIDE_LENGTH * (getZoomedRatio() / 100));
            $("#board").css("width", $("#board").css('height'));
            $('#board').css('column-gap', '0px');
            $("#id_chessboard").css("width", $("#board").css('width'));

        } else {
            console.log("you have zoomed out i.e less than 100%")
            getZoomedRatio();
            getChessBoardSize();
            let current_width = $('.className_grid_div').css('width');
            $('.className_grid_div').css('width', SIDE_LENGTH * (getZoomedRatio() / 100))
            $('.className_grid_div').css('height', SIDE_LENGTH * (getZoomedRatio() / 100))
            $('.pieces').css('width', SIDE_LENGTH * (getZoomedRatio() / 100))
            $('.pieces').css('height', SIDE_LENGTH * (getZoomedRatio() / 100))
            $("#board").css("width", $("#board").css('height'));

            $("#id_chessboard").css("width", $("#board").css('width'))
        }
    }


    // 渲染HTML Elements.
    // Render the html elements to the webpage.
    render() {
        this.board.intersections[this.point.x_coor - 1][this.point.y_coor - 1].elem.append(this.elem) // encapsulates the next line of code;

        $(this.elem).addClass('pieces');

        //add className for the HTML <img> of the piece - PieceRole
        $(this.elem).addClass(this.piece_role.toString());

        //add className for the HTML <img> of the piece - PieceColor
        $(this.elem).addClass(PlayerColor[this.color].toString());


        // $(window).on('resize',Piece.adjustResize);

        // $(this.elem)
        //     .on('mousedown',function () {
        //         isDragging = false;
        //         console.log(isDragging)
        //     })
        //     .on('mousemove',function () {
        //         isDragging = true;
        //         console.log(isDragging)
        //     })
        //     .on('mouseup',function () {
        //         var wasDragging = isDragging;
        //         isDragging = false;
        //         console.log(isDragging)
        //         if (!wasDragging) {
        //             console.log('dragging')
        //             $("#throbble").toggle();
        //         }
        //     });



        // TODO: click events:
    }

    destroy() {
        this.board.intersections[this.point.x_coor - 1][this.point.y_coor - 1].elem.remove(this.elem) // encapsulates the next line of code;
    }
}

export {
    Piece,
    PieceRole,
    PlayerColor
}