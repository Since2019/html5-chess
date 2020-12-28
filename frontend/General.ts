import { Board } from "./board";
import { Piece, PieceRole, PieceColor } from "./ChessPiece";
import { Point } from "./frontend-utils";
import Log from "../src/Util";
// import {PieceRole} from "./ChessPiece"

class General extends Piece {

    constructor(point: Point, board: Board) {
        super(point, board);
    }


    render() {
        super.render()
        console.log('this.piece_role')
        console.log(PieceRole[this.piece_role].toString())
        console.log(PieceColor[this.color].toString())
        $(this.elem).addClass(PieceRole[this.piece_role].toString()); //add className for the HTML <img> of the piece - PieceRole
        $(this.elem).addClass(PieceColor[this.color].toString());     //add className for the HTML <img> of the piece - PieceColor
    }


}

class RedGeneral extends General {

    // this_obj:RedGeneral;
    piece_role: PieceRole;
    color: PieceColor;
    public board: Board;
    constructor(board: Board, point: Point) {
        super(point, board);
        this.elem.src = './img/pieces/red-shuai.png';
        this.piece_role = PieceRole.General;
        this.color = PieceColor.RED;
        this.board = board;

        this.point.setPiece(this) //sets the piece to the point.
    }

    public canMove() {
        this.checkColumns()
        // this.checkRows();
        
    }

    //returns the grids that General can go in a column
    private checkColumns() {
        console.log('current point')
        console.log(this.point)
        let Y_coor = this.point.y_coor
        let X_coor = this.point.x_coor
        console.log(`X: ${X_coor}`)
        console.log(`Y: ${Y_coor}`)
        console.log('moveable points')

        let front = this.board.getPointFromCoordinates(X_coor,Y_coor - 1)
        let back  = this.board.getPointFromCoordinates(X_coor,Y_coor + 1) //out of bound err
        if(front){

            console.log('front.getPiece()')
            console.log(front.getPiece())
        }

        console.log(this.board.getColFromXCoordinate(X_coor))
    }

    //returns the grids that General can go in a row
    private checkRows() {
        console.log('current point')
        console.log(this.point)
        let Y_coor = this.point.y_coor
        let X_coor = this.point.x_coor
        console.log(`X: ${X_coor}`)
        console.log(`Y: ${Y_coor}`)
        console.log('moveable points')

        let front = this.board.getPointFromCoordinates(X_coor,Y_coor - 1)
        let back  = this.board.getPointFromCoordinates(X_coor,Y_coor + 1) //out of bound err
        if(front){

            console.log('front.getPiece()')
            console.log(front.getPiece())
        }

        console.log(this.board.getColFromXCoordinate(X_coor))

    }




}


class BlackGeneral extends General {

    piece_role: PieceRole;
    color: PieceColor;
    constructor(board: Board, point: Point) {
        super(point, board);
        this.elem.src = './img/pieces/black-jiang.png';
        this.piece_role = PieceRole.General;
        this.color = PieceColor.BLACK;
        this.board = board;
        this.point.setPiece(this) //sets the piece to the point.
    }


}

export {
    RedGeneral,
    BlackGeneral
}