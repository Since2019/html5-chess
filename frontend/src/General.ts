import { Board } from "./Boards";
import { Piece, PieceRole, PieceColor } from "./ChessPiece";
import { Point } from "./frontend-utils";

abstract class General extends Piece {

    constructor(point: Point, board: Board, color: PieceColor) {
        super(point, board, PieceRole.General, color);
    }

    /**
     * 
     * @param x 
     * @param y 
     * @returns boolean to indicate if the pass in coordinate is valid general position
     */
    protected abstract isValidGeneralPosition(x: number, y: number): boolean;


    public canMove(dest: Point): boolean {
        let x = dest.x_coor;
        let y = dest.y_coor;

        if (!this.isValidGeneralPosition(x, y))
            return false;

        if (Math.abs(x - this.point.x_coor) > 1 || Math.abs(y - this.point.y_coor) > 1)
            return false;

        // We will add more logic for checking valid move later
        // Current check is only for a valid position and no same side piece
        return !super.checkSameColorPiece(dest);
    }

}

class RedGeneral extends General {

    // this_obj:RedGeneral;
    protected board: Board;
    constructor(board: Board, point: Point) {
        super(point, board, PieceColor.RED);
        this.elem.src = '../img/pieces/red-shuai.png';
        this.board = board;

        this.point.setPiece(this); //sets the piece to the point.
    }

    //returns the grids that General can go in a column
    private checkColumns() {
        let Y_coor = this.point.y_coor
        let X_coor = this.point.x_coor

        let front = this.board.getPointFromCoordinates(X_coor,Y_coor - 1)
        let back  = this.board.getPointFromCoordinates(X_coor,Y_coor + 1) //out of bound err
        if(front){

            console.log('front.getPiece()');
            console.log(front.getPiece());
        }

        console.log(this.board.getColFromXCoordinate(X_coor));
    }

    //returns the grids that General can go in a row
    private checkRows() {
        let Y_coor = this.point.y_coor;
        let X_coor = this.point.x_coor;

        let front = this.board.getPointFromCoordinates(X_coor,Y_coor - 1);
        let back  = this.board.getPointFromCoordinates(X_coor,Y_coor + 1); //out of bound err
        if(front){

            console.log('front.getPiece()');
            console.log(front.getPiece());
        }

        console.log(this.board.getColFromXCoordinate(X_coor));

    }

    protected isValidGeneralPosition(x: number, y: number) {
        return (y >= 8) && (y <= 10) && (x >= 4) && (x <= 6) && !(x>0 && y>0);
    }
}


class BlackGeneral extends General {

    constructor(board: Board, point: Point) {
        super(point, board, PieceColor.BLACK);
        this.elem.src = '../img/pieces/black-jiang.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.
    }

    protected isValidGeneralPosition(x: number, y: number) {
        return (y >= 1) && (y <= 3) && (x >= 4) && (x <= 6) && !(x>0 && y>0);
    }


}

export {
    RedGeneral,
    BlackGeneral
}