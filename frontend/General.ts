import { Board } from "./board";
import { Piece } from "./ChessPieces";
import { Point } from "./frontend-utils";


class General extends Piece {

    constructor(point: Point, board: Board) {
        super(point, board);

    }


}

class RedGeneral extends General {

    constructor(board: Board, point: Point) {
        super(point, board);
        this.elem.src = './img/pieces/red-shuai.png';
    }

    render() {
        $(this.board.div_2d_array[this.point.x_coor-1][this.point.y_coor-1]).append(this.elem);
    }   

}

export {
    RedGeneral
}