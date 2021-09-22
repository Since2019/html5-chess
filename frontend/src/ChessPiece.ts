import Log from "../../src/Util";
import { Board } from "./Boards";
import { getZoomedRatio, getChessBoardSize, Point, SIDE_LENGTH } from "./frontend-utils";



// used in class Piece
// 棋子颜色
enum PieceColor {
    'BLACK',
    'RED'
}

// used in class Game, 
// 玩家颜色
enum PlayerColor {
    'black',
    'red'
}

// 棋子类型
enum PieceRole {
    'General',
    'Advisor',
    'Elephant',
    'Chariot',
    'Horse',
    'Cannon',
    'Soldier'
}


abstract class Piece {

    protected board: Board; // 棋盘ptr

    protected active: boolean; // 是否处于被选中状态 
    protected has_moved: boolean; // 已经移动了？
    protected side_length: number; // 棋子边长
    protected ratio: number;       //
    protected point: Point;        // 现在所处的位置

    protected piece_role!: PieceRole;
    protected color: PieceColor;

    protected elem: HTMLImageElement;
    protected state:number;


    constructor(point: Point, board: Board, role: PieceRole, color: PieceColor) {
        // 初始状态 
        this.point = point;                                  // 被置于某个点
        this.has_moved = false;                              // 是否已经被移动
        this.active = false;                                 // 是否被选中
        this.ratio = 100;                                    // TODO:放大倍率 ?
        this.side_length = this.ratio * 0.01 * SIDE_LENGTH;  // 棋子的边长
        this.board = board;
        this.elem = document.createElement("img");
        this.piece_role = role;
        this.color = color;

        // 0 -> not selected
        // 1 -> selected, not moved
        // 2 -> moved, refesh state to 0
        this.state = 0; 


        $(window).on('mousedown', (e) => {
            e.preventDefault(); //get rid of non-game experience (selecting pictures and stuff)
        })

        $(window).on('change', (e) => {
            e.preventDefault(); //get rid of non-game experience (selecting pictures and stuff)
            console.log('changed')
        })

        // 运行这个，就会把所有的Listener都加上
        this.listenerManager()


    
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
        $(this.elem).on('click', (e) => {
            e.preventDefault();

            // 1. clearing all the colored background first:
            $('.className_grid_div').css('background', 'rgba(3, 181, 252,0.0)')


            // 2. highlight all the movalbe positions
            let movable_points = []
            movable_points = this.movablePoints();
            console.log(movable_points)

            // 3. highlight all the movalbe positions
            movable_points.forEach(point => {
                $(point.elem).css('background', 'rgba(3, 181, 252,0.5')
            });

            this.active = true;
            this.board.active_piece = this;


            // TODO:找到ListenerManager的问题所在，并且把这个移动到那里面。
            this.attachMoveToGridListener() 


        })
    }

    /**
     *  II. once the user has selected the piece,
     *  a listener is attached to the grid to check 
     *  which grid the user is moving to
     * 
     *  选择了棋子之后 再选择移动到哪个格子
     */
    private attachMoveToGridListener() {

        //3. attach another listener which listens to the next click:

        $('.className_grid_div').on('click', (e) => {
            console.log(`clicked on`)
            console.log(e.target)
            console.log(e.target.id)
            console.log(e.target.className)

            //if the piece is selected
            if(this.board.active_piece){
                console.log('the piece is selected?' + this.active);
                console.log(`active piece:`);
                console.log(this.board.active_piece);
                console.log(this.board.next_coordinate )
                
                // 如果不是 [-1, -1], 说明玩家选择了某个格子
                if(this.board.next_coordinate[0] != -1 && this.board.next_coordinate[1] != -1 ) {
                    console.log(this.board.next_coordinate );
                    let next_x_coor = this.board.next_coordinate[0]
                    let next_y_coor = this.board.next_coordinate[1]
                    // 移动到下一个
                    this.board.active_piece.moveToPoint(this.board.getPointFromCoordinates(next_x_coor, next_y_coor));
                    
                    // 重新归[-1, -1]
                    this.board.next_coordinate = [-1,-1]
                }
                    
            }
            else{
                console.log('the piece is selected?' + this.active);
                console.log('doing nothing');  
                
                
                // 既然已经确认了要走到那里，就要移动到指定的格子。

                this.board.next_coordinate  = this.board.getCoordinateFromElemId(e.target.id);

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
        $('.className_grid_div').on('click', (e) => {
            console.log('clicked')
            $('.className_grid_div').unbind('click');  // after clicking, we need to get rid of the listener
            $('.className_grid_div').css('background', 'rgba(0,0,0,0.0)') // setting back the background to non-colored and transparent
        })

    }




    public movablePoints(): Point[] {
        Log.trace('movable points of a piece')
        return []
    }

    protected getElement(): HTMLImageElement {
        return this.elem;
    }

    public getRole(): PieceRole {
        return this.piece_role;
    }

    public getColor(): PieceColor {
        return this.color;
    }

    //sets the point of the piece
    public moveToPoint(point: Point) {
        this.point = point;
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
 * 
 */
    protected isFriendly(piece: Piece): boolean {
        if (!piece) {
            return false;
        }
        return piece.getColor() === this.color;
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
            $('.className_grid_div').css('width', SIDE_LENGTH * (getZoomedRatio() / 100))
            $('.className_grid_div').css('height', SIDE_LENGTH * (getZoomedRatio() / 100))
            $('.pieces').css('width', SIDE_LENGTH * (getZoomedRatio() / 100))
            $('.pieces').css('height', SIDE_LENGTH * (getZoomedRatio() / 100))
            $("#board").css("width", $("#board").css('height'));

            $("#id_chessboard").css("width", $("#board").css('width'))

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

    render() {
        this.board.intersections[this.point.x_coor - 1][this.point.y_coor - 1].elem.append(this.elem) // encapsulates the next line of code;

        $(this.elem).addClass('pieces');

        //add className for the HTML <img> of the piece - PieceRole
        $(this.elem).addClass(PieceRole[this.piece_role].toString());

        //add className for the HTML <img> of the piece - PieceColor
        $(this.elem).addClass(PieceColor[this.color].toString());


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
}

export {
    Piece,
    PieceRole,
    PieceColor
}