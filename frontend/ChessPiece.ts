import { Board } from "./board";
import {getZoomedRatio, getChessBoardSize, Point, SIDE_LENGTH} from "./frontend-utils";



// used in class Piece
enum PieceColor {
    'black',
    'red'
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
    protected board: Board;
    protected selected: boolean;
    protected active: boolean;
    private side_length: number;
    private ratio: number;
    protected point: Point;

    protected elem: HTMLImageElement;

    constructor (point:Point, board:Board) {
        this.point = point;
        this.selected = false;
        this.active = false;
        this.ratio = 100;
        this.side_length = this.ratio * 0.01 * SIDE_LENGTH;
        this.board = board;
        this.elem = document.createElement("img");
    }

    private static adjustResize: () => void = () => {
        if (screen.width == window.innerWidth) {
            console.log("at exact 100%");

            getChessBoardSize();
            $('.className_grid_div').css('width', SIDE_LENGTH * (getZoomedRatio()/100))
            $('.className_grid_div').css('height',SIDE_LENGTH * (getZoomedRatio()/100))
            $('.pieces').css('width', SIDE_LENGTH * (getZoomedRatio()/100))
            $('.pieces').css('height', SIDE_LENGTH * (getZoomedRatio()/100))
            $("#board").css("width", $("#board").css('height'));

            $("#id_chessboard").css("width", $("#board").css('width'))

            
        } else if (screen.width > window.innerWidth) {
            console.log("you have zoomed in the page i.e more than 100%");
            getZoomedRatio()
            getChessBoardSize()
            $('.className_grid_div').css('width', SIDE_LENGTH *(getZoomedRatio()/100))
            $('.className_grid_div').css('height', SIDE_LENGTH * (getZoomedRatio()/100))
            $('.pieces').css('width', SIDE_LENGTH * (getZoomedRatio()/100))
            $('.pieces').css('height', SIDE_LENGTH * (getZoomedRatio()/100))
            $("#board").css("width", $("#board").css('height'));

            $("#id_chessboard").css("width", $("#board").css('width'))

        } else {
            console.log("you have zoomed out i.e less than 100%")
            getZoomedRatio()
            getChessBoardSize()
            let current_width = $('.className_grid_div').css('width');
            $('.className_grid_div').css('width', SIDE_LENGTH * (getZoomedRatio()/100))
            $('.className_grid_div').css('height', SIDE_LENGTH * (getZoomedRatio()/100))
            $('.pieces').css('width', SIDE_LENGTH * (getZoomedRatio()/100))
            $('.pieces').css('height', SIDE_LENGTH * (getZoomedRatio()/100))
            $("#board").css("width", $("#board").css('height'));

            $("#id_chessboard").css("width", $("#board").css('width'))
        }
    }

    render() {
        this.elem.className = "pieces";
        $(window).resize(Piece.adjustResize);
    }
}

export {
    Piece
}