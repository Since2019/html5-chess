import Log from "../Util";
import { Board } from "../Boards";
import { Piece, PieceRole, PlayerColor } from "./ChessPiece";
import { Point } from "../frontend-utils";

abstract class WarElephant extends Piece {

    constructor(
        point: Point,
        board: Board,
        color: PlayerColor
    ) {
        super(point, board, PieceRole.WarElephant, color);
    }



    /**
     * 
     * @param x 
     * @param y 
     * @returns boolean to indicate if the pass in coordinate is valid general position
     */
    protected abstract isValidPosition(targetPoint: Point): boolean;


    public canMove(dest: Point): boolean {
        let x = dest.x_coor;
        let y = dest.y_coor;


        //If the place is outside of reach from the General,
        //It returns false.
        if (Math.abs(x - this.point.x_coor) > 1 || Math.abs(y - this.point.y_coor) > 1)
            return false;

        // We will add more logic for checking valid move later
        // Current check is only for a valid position and no same side piece
        return !super.checkSameColorPieceInPoint(dest);
    }

    movablePoints() {
        let moveable_points: Point[] = [];

        // 
        moveable_points = moveable_points.concat(this.checkMoves());
        return moveable_points;
    }

    //returns the grids that the General can go in a row
    private checkMoves() {
        Log.trace("in checkMoves()")
        // let Y_coor = this.point.y_coor
        let X_coor = this.point.getX();
        let Y_coor = this.point.getY();

        let front_left = new Point(-1, -1); // WHY: 如果不建一个点，try catch里面的会是局部变量
        let front_left_block_pos = new Point(-1, -1);

        let front_right = new Point(-1, -1);
        let front_right_block_pos = new Point(-1, -1);


        let back_left = new Point(-1, -1);
        let back_left_block_pos = new Point(-1, -1);

        let back_right = new Point(-1, -1);
        let back_right_block_pos = new Point(-1, -1);




        front_left_block_pos = this.board.getPointFromCoordinates(X_coor + 1, Y_coor + 1);
        front_right_block_pos = this.board.getPointFromCoordinates(X_coor - 1, Y_coor + 1);

        back_left_block_pos = this.board.getPointFromCoordinates(X_coor + 1, Y_coor - 1)
        back_right_block_pos = this.board.getPointFromCoordinates(X_coor - 1, Y_coor - 1)



        // 没有堵象眼的阻碍才能走
        try {
            if (!front_left_block_pos.piece)
                front_left = this.board.getPointFromCoordinates(X_coor + 2, Y_coor + 2);

        } catch (e) {

        }


        try {
            if (!front_right_block_pos.piece)
                front_right = this.board.getPointFromCoordinates(X_coor - 2, Y_coor + 2);
        } catch (e) {

        }


        try {
            if (!back_left_block_pos.piece)
                back_left = this.board.getPointFromCoordinates(X_coor + 2, Y_coor - 2)
        }
        catch (e) {

        }

        try {

            if (!back_right_block_pos.piece)
                back_right = this.board.getPointFromCoordinates(X_coor - 2, Y_coor - 2)

        } catch (e) {

        }


        let movable_points_in_this_column: Point[] = [];

        //  __ __   
        // |__|__|
        // |__|__|

        // 

        console.log("++++++++++++++++++++++ debug +++++++++++++++++++++++")

        // 面前的格子
        if (front_left && this.isValidPosition(front_left)) {
            movable_points_in_this_column.push(front_left)
        }
        // 
        if (front_right && this.isValidPosition(front_right)) {
            movable_points_in_this_column.push(front_right)
        }

        if (back_left && this.isValidPosition(back_left)) {
            movable_points_in_this_column.push(back_left)
        }

        if (back_right && this.isValidPosition(back_right)) {

            console.log(back_right.getPiece());
            movable_points_in_this_column.push(back_right)
        }


        return movable_points_in_this_column;

    }

}

class BlackWarElephant extends WarElephant {

    protected board: Board;

    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.BLACK);
        this.elem.src = '../img/pieces/black-xiang.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.


        $(this.elem).on('click', () => {
            super.movablePoints();
        });
    }

    protected isValidPosition(targetPoint: Point): boolean {
        // 无法渡河
        if (targetPoint.getY() <= 5) {
            return true;
        }
        // 以上条件不满足，则return false.
        return false;
    }

}


class RedWarElephant extends WarElephant {

    protected board: Board;

    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.RED);
        this.elem.src = '../img/pieces/red-xiang.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.


        $(this.elem).on('click', () => {
            super.movablePoints();
        });
    }

    protected isValidPosition(targetPoint: Point): boolean {
        // 无法渡河
        if (targetPoint.getY() >= 6) {
            return true;
        }
        // 以上条件不满足，则return false.
        return false;
    }

}


export {
    BlackWarElephant,
    RedWarElephant
}