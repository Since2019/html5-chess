import Log from "../src/Util";


function getZoomedRatio() {
    let ratio = 0;
        // screen = window.screen,
        // ua = navigator.userAgent.toLowerCase();
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

    // Points can hold pieces 
    piece? : Piece;


    public setPiece(piece:Piece){
        this.piece = piece;
    }

    public getPiece(){
        return this.piece;
    }

    constructor(col: number, row: number) {

        this.x_coor = col; //file -> verticle
        this.y_coor = row; //rank -> horizontal
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
    SIDE_LENGTH_vw
}