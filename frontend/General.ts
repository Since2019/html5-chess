import { Board } from "./board";
import { Piece, PieceRole, PieceColor } from "./ChessPiece";
import { Point } from "./frontend-utils";
import Log from "../src/Util";
// import {PieceRole} from "./ChessPiece"

class General extends Piece {

    constructor(point: Point, board: Board) {
        super(point, board);
    }

    

    
    public canMove(){
        this.checkRows();
    }

    //returns the grids that General can go
    private checkRows(){
        console.log('current point')   
        console.log(this.point)

        let X_coor = this.point.x_coor
        let Y_coor = this.point.y_coor
        console.log(`X: ${X_coor}`)
        console.log(`Y: ${Y_coor}`)

        console.log('moveable points')

       
       console.log(this.board.getColFromXCoordinate(X_coor))
       console.log(this.board.getRowFromYCoordinate(Y_coor))
    }

    private checkColumns(){

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