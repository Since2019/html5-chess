import { Board } from "./Boards";
import { Piece, PieceRole, PieceColor } from "./ChessPiece";
import { Point } from "./frontend-utils";

class General extends Piece {

    constructor(point: Point, board: Board, color: PieceColor) {
        super(point, board, PieceRole.General, color);
    }


    render() {
        super.render();
        $(this.elem).addClass(PieceRole[this.piece_role].toString()); //add className for the HTML <img> of the piece - PieceRole
        $(this.elem).addClass(PieceColor[this.color].toString());     //add className for the HTML <img> of the piece - PieceColor
    }


}

class RedGeneral extends General {

    // this_obj:RedGeneral;
    protected board: Board;
    constructor(board: Board, point: Point) {
        super(point, board, PieceColor.RED);
        this.elem.src = './img/pieces/red-shuai.png';
        this.board = board;

        this.point.setPiece(this); //sets the piece to the point.
    }

    public canMove() {
        this.checkColumns();
        // this.checkRows();
        
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
}


class BlackGeneral extends General {

    constructor(board: Board, point: Point) {
        super(point, board, PieceColor.BLACK);
        this.elem.src = './img/pieces/black-jiang.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.
    }


}

export {
    RedGeneral,
    BlackGeneral
}