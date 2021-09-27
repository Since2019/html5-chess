import { Board } from "./Boards";
import { Piece, PieceRole, PlayerColor } from "./ChessPiece";
import { Point } from "./frontend-utils";

abstract class General extends Piece {

    constructor(point: Point, board: Board, color: PlayerColor) {
        super(point, board, PieceRole.General, color);
    }

    /**
     * 
     * @param x 
     * @param y 
     * @returns boolean to indicate if the pass in coordinate is valid general position
     */
    protected abstract isValidGeneralPosition(targetPoint: Point): boolean;


    public canMove(dest: Point): boolean {
        let x = dest.x_coor;
        let y = dest.y_coor;

        //If the dest is not inside of the "田" shaped space of the board
        //Returns false.
        // if (!this.isValidGeneralPosition(x, y))
        //     return false;

        //If the place is outside of reach from the General,
        //It returns false.
        if (Math.abs(x - this.point.x_coor) > 1 || Math.abs(y - this.point.y_coor) > 1)
            return false;



        // We will add more logic for checking valid move later
        // Current check is only for a valid position and no same side piece
        return !super.checkSameColorPieceInPoint(dest);
    }

}

class RedGeneral extends General {

    protected board: Board;
    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.RED);
        this.elem.src = '../img/pieces/red-shuai.png';
        this.board = board;

        this.point.setPiece(this); //sets the piece to the point.
    }


    movablePoints() {
        let moveable_points: Point[] = [];
        moveable_points = moveable_points.concat(this.checkPeriphery());
        return moveable_points
    }


    //returns the grids that General can go in a column
    private checkPeriphery() {
        let Y_coor = this.point.y_coor
        let X_coor = this.point.x_coor

        let front = this.board.getPointFromCoordinates(X_coor, Y_coor - 1)
        let back = this.board.getPointFromCoordinates(X_coor, Y_coor + 1) //out of bound err

        let left = this.board.getPointFromCoordinates(X_coor - 1, Y_coor)
        let right = this.board.getPointFromCoordinates(X_coor + 1, Y_coor)


        let movable_points_in_this_column: Point[] = [];

        //  __ __   
        // |__|__|
        // |__|__|

        // 

        console.log("+++++++++++++ debug +++++++++++++++++++++++")

        // 面前的格子
        if (front && this.isValidGeneralPosition(front)) {
            console.log('front.getPiece()');
            console.log(front.getPiece());
            movable_points_in_this_column.push(front)

        }

        if (back && this.isValidGeneralPosition(back)) {
            console.log('back.getPiece()');
            console.log(back.getPiece());
            movable_points_in_this_column.push(back)

        }

        if (left && this.isValidGeneralPosition(left)) {
            console.log('back.getPiece()');
            console.log(left.getPiece());
            movable_points_in_this_column.push(left)
        }

        if (right && this.isValidGeneralPosition(right)) {
            console.log('back.getPiece()');
            console.log(right.getPiece());
            movable_points_in_this_column.push(right)

        }

        return movable_points_in_this_column;
    }


    protected isValidGeneralPosition(targetPoint: Point): boolean {
        console.log('isValidGeneralPosition +++++++++++');



        console.log(targetPoint);
        console.log(targetPoint.getX());
        console.log(targetPoint.getY());


        // 外层if表示田字的横坐标范围
        if (targetPoint.getX() - 1 >= 3 && targetPoint.getX() - 1 <= 5) {
            // 内层是纵坐标范围
            if (targetPoint.getY() - 1 >= 7 && targetPoint.getY() - 1 <= 9) {
                return true;
            }
        }


        // 以上条件不满足，则return false.
        return false;
    }
}


class BlackGeneral extends General {

    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.BLACK);
        this.elem.src = '../img/pieces/black-jiang.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.
    }

    movablePoints() {
        let moveable_points: Point[] = [];
        moveable_points = moveable_points.concat(this.checkPeriphery());
        return moveable_points
    }

    private checkPeriphery() {
        let Y_coor = this.point.y_coor
        let X_coor = this.point.x_coor

        let front = this.board.getPointFromCoordinates(X_coor, Y_coor - 1)
        let back = this.board.getPointFromCoordinates(X_coor, Y_coor + 1) //out of bound err

        let left = this.board.getPointFromCoordinates(X_coor - 1, Y_coor)
        let right = this.board.getPointFromCoordinates(X_coor + 1, Y_coor)


        let movable_points_in_this_column: Point[] = [];

        //  __ __   
        // |__|__|
        // |__|__|

        // 

        console.log("+++++++++++++ debug +++++++++++++++++++++++")

        // 面前的格子
        if (front && this.isValidGeneralPosition(front)) {
            console.log('front.getPiece()');
            console.log(front.getPiece());
            movable_points_in_this_column.push(front)

        }

        if (back && this.isValidGeneralPosition(back)) {
            console.log('back.getPiece()');
            console.log(back.getPiece());
            movable_points_in_this_column.push(back)

        }

        if (left && this.isValidGeneralPosition(left)) {
            console.log('back.getPiece()');
            console.log(left.getPiece());
            movable_points_in_this_column.push(left)
        }

        if (right && this.isValidGeneralPosition(right)) {
            console.log('back.getPiece()');
            console.log(right.getPiece());
            movable_points_in_this_column.push(right)

        }

        return movable_points_in_this_column;
    }


    protected isValidGeneralPosition(targetPoint: Point): boolean {
        console.log('isValidGeneralPosition +++++++++++');

        console.log(targetPoint);
        console.log(targetPoint.getX());
        console.log(targetPoint.getY());

        // 外层if表示田字的横坐标范围
        if (targetPoint.getX() >= 4 && targetPoint.getX() - 1 <= 6) {
            // 内层是纵坐标范围
            if (targetPoint.getY() >= 1 && targetPoint.getY() <= 3) {
                return true;
            }
        }


        return false;
    }


}

export {
    RedGeneral,
    BlackGeneral
}