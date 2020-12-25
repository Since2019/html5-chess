import { Board } from "./board";
import { Piece } from "./ChessPiece";
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
        console.log('this.point.x_coor')
        console.log(this.point.x_coor)

        console.log('this.point.y_coor')
        console.log(this.point.y_coor)

        $(this.board.div_2d_array[this.point.x_coor ][this.point.y_coor ]).append(this.elem);
    }   

}


class BlackGeneral extends General {

    constructor(board: Board, point: Point) {
        super(point, board);
        this.elem.src = './img/pieces/black-jiang.png';
    }

    render() {
        console.log('this.point.x_coor')
        console.log(this.point.x_coor)

        console.log('this.point.y_coor')
        console.log(this.point.y_coor)

        $(this.board.div_2d_array[this.point.x_coor ][this.point.y_coor ]).append(this.elem);
    }   

}

export {
    RedGeneral,
    BlackGeneral
}