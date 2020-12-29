import { Board } from "./board";
import { getZoomedRatio, getChessBoardSize, Point, SIDE_LENGTH } from "./frontend-utils";
import Log from "../src/Util";



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


class Piece {


    board: Board;
    selected: boolean;
    active: boolean;
    side_length: number;
    ratio: number;
    point: Point;

    piece_role!: PieceRole;
    color!: PieceColor;

    elem: HTMLImageElement;

    getElement?() {
        return this.elem;
    }

    //sets the point of the piece
    public moveToPoint(point: Point) {
        this.point = point;
    }

    constructor(point: Point, board: Board) {
        this.point = point;

        this.selected = false;
        this.active = false;
        this.ratio = 100;
        this.side_length = this.ratio * 0.01 * SIDE_LENGTH;
        this.board = board;
        this.elem = document.createElement("img");

    }


    public canMove() {
        console.log('returns a bool whether the piece can move or not.')
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
            getZoomedRatio()
            getChessBoardSize()
            $('.className_grid_div').css('width', SIDE_LENGTH * (getZoomedRatio() / 100))
            $('.className_grid_div').css('height', SIDE_LENGTH * (getZoomedRatio() / 100))
            $('.pieces').css('width', SIDE_LENGTH * (getZoomedRatio() / 100))
            $('.pieces').css('height', SIDE_LENGTH * (getZoomedRatio() / 100))
            $("#board").css("width", $("#board").css('height'));

            $("#id_chessboard").css("width", $("#board").css('width'))

        } else {
            console.log("you have zoomed out i.e less than 100%")
            getZoomedRatio()
            getChessBoardSize()
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
        // click events:
        $(this.elem).on('click',(e) => {
            this.canMove();
        });
    }
}

export {
    Piece,
    PieceRole,
    PieceColor
}