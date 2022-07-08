import Log from "../../../src/Util";
import { Board } from "../Boards";
import { Piece, PieceRole, PlayerColor } from "./ChessPiece";
import { Point } from "../frontend-utils";


// 士 
abstract class Advisor extends Piece {

    constructor(
        point: Point,
        board: Board,
        color: PlayerColor
    ) {
        super(point, board, PieceRole.Advisor, color);


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


class RedAdvisor extends Advisor {

    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.RED);
        // this.piece_role = this.piece_role.substring(0, 1).toUpperCase();
        this.elem.src = '../img/pieces/red-shi.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.
    }

    movablePoints() {
        let moveable_points: Point[] = [];
        moveable_points = moveable_points.concat(this.checkPeriphery());
        return moveable_points
    }

    private checkPeriphery() {
        let X_coor = this.point.getX();
        let Y_coor = this.point.getY();

        let front_left = this.board.getPointFromCoordinates(X_coor - 1, Y_coor - 1);
        let front_right = this.board.getPointFromCoordinates(X_coor + 1, Y_coor - 1); // HACK: tabnine generated those  '+' signs !

        let back_left = new Point(-1, -1); // WHY: 如果不建一个点，try catch里面的会是局部变量
        let back_right = new Point(-1, -1);

        try {
            back_left = this.board.getPointFromCoordinates(X_coor - 1, Y_coor + 1) //out of bound err
            back_right = this.board.getPointFromCoordinates(X_coor + 1, Y_coor + 1)
        }
        catch (err) {
            Log.trace("出错！")
            console.error(err);
        }

        let movable_points_in_this_column: Point[] = [];

        //  __ __   
        // |__|__|
        // |__|__|

        // 

        console.log("++++++++++++++++++++++ debug +++++++++++++++++++++++")

        // 面前的格子
        if (front_left && this.isValidGeneralPosition(front_left)) {
            movable_points_in_this_column.push(front_left)
        }
        // 
        if (front_right && this.isValidGeneralPosition(front_right)) {
            movable_points_in_this_column.push(front_right)
        }

        if (back_left && this.isValidGeneralPosition(back_left)) {
            movable_points_in_this_column.push(back_left)
        }

        if (back_right && this.isValidGeneralPosition(back_right)) {

            console.log(back_right.getPiece());
            movable_points_in_this_column.push(back_right)
        }


        return movable_points_in_this_column;
    }


    protected isValidGeneralPosition(targetPoint: Point): boolean {
        console.log('isValidGeneralPosition +++++++++++');



        console.log(targetPoint);
        console.log(targetPoint.getX());
        console.log(targetPoint.getY());


        // 外层if表示田字的横坐标范围
        if (targetPoint.getX() >= 4 && targetPoint.getX() <= 6) {
            // 内层是纵坐标范围
            if (targetPoint.getY() >= 8 && targetPoint.getY() <= 10) {
                return true;
            }
        }


        // 以上条件不满足，则return false.
        return false;
    }
}

class BlackAdvisor extends Advisor {

    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.BLACK);
        // this.piece_role = this.piece_role.substring(0, 1).toLowerCase();

        this.elem.src = '../img/pieces/black-shi.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.
    }

    movablePoints() {
        let moveable_points: Point[] = [];
        moveable_points = moveable_points.concat(this.checkPeriphery());
        return moveable_points
    }

    private checkPeriphery() {
        let X_coor = this.point.getX();
        let Y_coor = this.point.getY();

        let front_left = this.board.getPointFromCoordinates(X_coor + 1, Y_coor + 1);
        let front_right = this.board.getPointFromCoordinates(X_coor - 1, Y_coor + 1); // HACK: tabnine generated those  '+' signs !

        let back_left = new Point(-1, -1); // WHY: 如果不建一个点，try catch里面的会是局部变量
        let back_right = new Point(-1, -1);

        try {
            back_left = this.board.getPointFromCoordinates(X_coor + 1, Y_coor - 1) //out of bound err
            back_right = this.board.getPointFromCoordinates(X_coor - 1, Y_coor - 1)
        }
        catch (err) {
            Log.trace("出错！")
            console.error(err);
        }

        let movable_points_in_this_column: Point[] = [];

        //  __ __   
        // |__|__|
        // |__|__|

        // 

        console.log("++++++++++++++++++++++ debug +++++++++++++++++++++++")

        // 面前的格子
        if (front_left && this.isValidGeneralPosition(front_left)) {
            movable_points_in_this_column.push(front_left)
        }
        // 
        if (front_right && this.isValidGeneralPosition(front_right)) {
            movable_points_in_this_column.push(front_right)
        }

        if (back_left && this.isValidGeneralPosition(back_left)) {
            movable_points_in_this_column.push(back_left)
        }

        if (back_right && this.isValidGeneralPosition(back_right)) {

            console.log(back_right.getPiece());
            movable_points_in_this_column.push(back_right)
        }


        return movable_points_in_this_column;
    }


    protected isValidGeneralPosition(targetPoint: Point): boolean {
        console.log('isValidGeneralPosition +++++++++++');



        console.log(targetPoint);
        console.log(targetPoint.getX());
        console.log(targetPoint.getY());


        // 外层if表示田字的横坐标范围
        if (targetPoint.getX() >= 4 && targetPoint.getX() <= 6) {
            // 内层是纵坐标范围
            if (targetPoint.getY() >= 1 && targetPoint.getY() <= 3) {
                return true;
            }
        }


        // 以上条件不满足，则return false.
        return false;
    }
}

export {
    RedAdvisor as RedAdvisor,
    BlackAdvisor as BlackAdvisor
}