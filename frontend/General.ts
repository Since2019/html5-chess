import { Board } from "./board";
import { Piece ,PieceRole,PieceColor} from "./ChessPiece";
import { Point } from "./frontend-utils";
// import {PieceRole} from "./ChessPiece"

class General extends Piece {
    
    constructor(point: Point, board: Board) {
        super(point, board);
    }

    
    



}

class RedGeneral extends General {

    // this_obj:RedGeneral;
    piece_role : PieceRole;
    color:PieceColor;
    public board: Board;
    constructor(board: Board, point: Point) {
        super(point, board);
        this.elem.src = './img/pieces/red-shuai.png';
        this.piece_role = PieceRole.General;
        this.color = PieceColor.red;
        this.board = board;
  
        this.point.setPiece(this) //sets the piece to the point.
    }

    render() {
        console.log('red this.point.x_coor')
        console.log(this.point.x_coor)

        console.log('red this.point.y_coor')
        console.log(this.point.y_coor)

        this.board.intersections[this.point.x_coor-1 ][this.point.y_coor-1].elem.append(this.elem) // encapsulates the next line of code;
        
    }   

}


class BlackGeneral extends General {

    constructor(board: Board, point: Point) {
        super(point, board);
        this.elem.src = './img/pieces/black-jiang.png';
    }

    render() {
        console.log('black this.point.x_coor')
        console.log(this.point.x_coor)

        console.log('black this.point.y_coor')
        console.log(this.point.y_coor)

        //In arrays, indexes are 1 less than the actual coordinates.
        this.board.intersections[this.point.x_coor-1 ][this.point.y_coor-1].elem.append(this.elem)
    }   

}

export {
    RedGeneral,
    BlackGeneral
}