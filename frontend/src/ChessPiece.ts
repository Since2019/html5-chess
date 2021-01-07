import Log from "../../src/Util";
import { Board } from "./Boards";
import { getZoomedRatio, getChessBoardSize, Point, SIDE_LENGTH } from "./frontend-utils";



// used in class Piece
enum PieceColor {
    'BLACK',
    'RED'
}

// used in class Game, 
enum PlayerColor {
    'black',
    'red'
}

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

    protected board: Board;

    protected active: boolean;
    protected has_moved: boolean;
    protected side_length: number;
    protected ratio: number;
    protected point: Point;

    protected piece_role!: PieceRole;
    protected color: PieceColor;

    protected elem: HTMLImageElement;
    protected state:number;


    constructor(point: Point, board: Board, role: PieceRole, color: PieceColor) {
        this.point = point;
        this.has_moved = false;
        this.active = false;
        this.ratio = 100;
        this.side_length = this.ratio * 0.01 * SIDE_LENGTH;
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


            this.attachMoveToGridListener() 



        })
    }

    /**
     *  II. once the user has selected the piece,
     *  a listener is attached to the grid to check 
     *  which grid the user is moving to 
     */
    private attachMoveToGridListener() {
        //3. attach another listener which listens to the next click:

        $('.className_grid_div').on('click', (e) => {
           
            //if the piece is selected
            if(this.board.active_piece){
                console.log('the piece is selected?' + this.active)
                console.log('clicked')
            }
            else{
                console.log('the piece is selected?' + this.active)
                console.log('doing nothing')
                $('.className_grid_div').css('background', 'rgba(0,0,0,0.0)') // setting back the background to non-colored and transparent

            }
            this.removeMoveToGridListener()
            // $('.className_grid_div').unbind('click');  // after clicking, we need to get rid of the listener
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

    private static adjustResize: () => void = () => {
        if (screen.width == window.innerWidth) {
            console.log("at exact 100%");

            getChessBoardSize();
            $('.className_grid_div').css('width', SIDE_LENGTH * (getZoomedRatio() / 100))
            $('.className_grid_div').css('height', SIDE_LENGTH * (getZoomedRatio() / 100))
            $('.pieces').css('width', SIDE_LENGTH * (getZoomedRatio() / 100))
            $('.pieces').css('height', SIDE_LENGTH * (getZoomedRatio() / 100))
            $("#board").css("width", $("#board").css('height'));

            $("#id_chessboard").css("width", $("#board").css('width'))


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