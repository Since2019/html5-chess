import Log from "../../src/Util";
import { Board } from "./Boards";
import { Piece } from './ChessPiece'

// // used in class Piece
// enum PieceColor {
//     'black',
//     'red'
// }

// used in class Game, 
enum PlayerColor {
    'BLACK',
    'RED',
    'NEUTRAL',    // Controls both sides 双方都可以控制
    'SPECTATOR'   // Cannot control either side. 双方都不可以控制
}


// 得到当前的放大倍率
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


// 得到棋盘的当前大小
function getChessBoardSize() {
    Log.trace('chessboard size:');
    let chessboard = $('#id_chessboard');

    Log.trace('chessboad width');
    Log.trace(chessboard.css('width'));

    Log.trace('chessboad height');
    Log.trace(chessboard.css('height'));
}


// The vertical lines are known as files (Chinese: 路; pinyin: lù; "road")
// the horizontal lines are known as ranks 线 xiàn; "line"
class Point {
    // 坐标
    x_coor: number;
    y_coor: number;

    elem: HTMLElement; // HTML <div> elements are bound with each point

    board!: Board;     // 棋子所属的棋盘

    piece?: Piece | null; // Points can hold pieces 

    /** when piece moves in
        it binds the piece with the grid.
        notice when the piece is moving out from a grid
        the piece should be set to null.
        @param piece: a nullable Piece object  
    */
    public setPiece(piece: Piece | null) {
        this.piece = piece;
    }


    // 判断点上是否有棋子
    public hasPiece(): boolean {
        return this.piece ? true : false;
    }

    //gets the piece in the current grid
    public getPiece() {
        return this.piece;
    }

    public getX() {
        return this.x_coor;
    }

    public getY() {
        return this.y_coor;
    }


    constructor(col: number, row: number) {
        // this.board = board;
        this.x_coor = col; //col -> verticle
        this.y_coor = row; //row -> horizontal

        // A dummy element for initialization first and then update in method
        this.elem = document.createElement('div');
        this.updateElement(col, row);
    }

    // 更新渲染
    private updateElement(newCol: number, newRow: number): void {
        let grid_div = this.elem;

        const oldCol = this.x_coor;
        const oldRow = this.y_coor;

        /* code previously found in board initialization, with div_2d_array
           now divs are bound to specific points.
        */
        grid_div.id = `grid_div_${oldCol}_${oldRow}`;
        $(`#${grid_div.id}`).remove(); //must remove the original one, in order to make it unique.
        grid_div.className = 'className_grid_div';
        $(grid_div).css('grid-column', newCol);
        $(grid_div).css('grid-row', newRow);

        $('#board').append(grid_div);

        // this.board.intersections[newCol-1][newRow-1] = this; //replace the original point with the newly updated point.
    }
}

//how many px when it's zoomed 100%
const SIDE_LENGTH: number = 75;
const SIDE_LENGTH_vw: number = 70 / (getZoomedRatio() * 0.01);

/**
 * 固定大小用的function
 * 
*/
function fitSize() {
    let board = $('#board')

    $.when(board)
        //fiting size for the board
        .then(() => {
            console.log('background-size')
            console.log(board.css('background-size'))

            board.css('width', board.css('height'))
            board.css('height', board.css('width'))
            // board.css('row-gap','0px')
            board.css('column-gap', '0px')

            console.log(board.css('row-gap'))

        })
        //fiting sizes for the grids
        .then(() => {
            $('.className_grid_div').css('width', parseInt(board.css('width')) / 11)
            $('.className_grid_div').css('height', parseInt(board.css('height')) / 10)
            $('.className_grid_div').css('z-index', 10)
            $('.className_grid_div').css('margin', 0)
        })
        //fiting sizes for the pieces
        .then(() => {
            $('.pieces').css('width', parseInt($('.className_grid_div').css('width')))
            $('.pieces').css('height', parseInt($('.className_grid_div').css('width')))
        })
        .then(() => {
            board.css('max-width', board.css('height'));
        })

}

export {
    getZoomedRatio,
    getChessBoardSize,
    fitSize,
    Point,
    SIDE_LENGTH,
    SIDE_LENGTH_vw,
    // PieceColor,
    PlayerColor,
}