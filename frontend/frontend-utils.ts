import Log from "../src/Util";
import { Board } from "./board";
import {Piece} from './ChessPiece'

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

function getZoomedRatio() {
    let ratio = 0;

        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        }


        else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
        }
        if (ratio) {
            ratio = Math.round(ratio * 100);
        }
        return ratio;
}


function getChessBoardSize() {
    Log.trace('chessboard size:');
    let chessboard = $('#id_chessboard');

    Log.trace( 'chessboad width');
    Log.trace(chessboard.css('width'));

    Log.trace( 'chessboad height');
    Log.trace(chessboard.css('height'));
}


// The vertical lines are known as files (Chinese: 路; pinyin: lù; "road")
// the horizontal lines are known as ranks 线 xiàn; "line"
class Point {
    x_coor: number;
    y_coor: number;
    elem : HTMLElement; // HTML <div> elements are bound with each point

    board : Board;
    
    piece? : Piece|null; // Points can hold pieces 

    /** when piece moves in
        it binds the piece with the grid.
        notice when the piece is moving out from a grid
        the piece should be set to null.
        @param piece: a nullable Piece object  
    */ 
    public setPiece(piece:Piece|null){
        this.piece = piece;
    }

    //gets the piece in the current grid
    public getPiece(){
        return this.piece;
    }

    constructor(board:Board, col: number, row: number) {
        this.board = board;
        this.x_coor = col ; //col -> verticle
        this.y_coor = row ; //row -> horizontal
        this.elem = document.createElement('div');
        let grid_div = this.elem

        

        /* code previously found in board initialization, with div_2d_array
           now divs are bound to specific points.
        */ 
        grid_div.id = `grid_div_${col}_${row}`;
        $(`#${grid_div.id}`).remove(); //must remove the original one, in order to make it unique.
        grid_div.className = 'className_grid_div'
        $(grid_div).css('grid-column', col);
        $(grid_div).css('grid-row', row);
        $('#board').append(grid_div);

        this.board.intersections[col-1][row-1] = this; //replace the original point with the newly updated point.
    }
}

//how many px when it's zoomed 100%
const SIDE_LENGTH: number = 75;
const SIDE_LENGTH_vw: number = 70 / (getZoomedRatio() * 0.01);

export {
    getZoomedRatio,
    getChessBoardSize,
    Point,
    SIDE_LENGTH,
    SIDE_LENGTH_vw,

    PieceColor,
    PlayerColor,
}