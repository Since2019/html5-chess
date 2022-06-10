import Log from "../Util";
import { Board } from "../Boards";
import { Piece, PieceRole, PlayerColor } from "./ChessPiece";
import { Point } from "../frontend-utils";

abstract class Knight extends Piece {

    constructor(
        point: Point,
        board: Board,
        color: PlayerColor
    ) {
        super(point, board, PieceRole.Cavalry, color);
    }

    /**
     * 
     * @param x 
     * @param y 
     * @returns boolean to indicate if the pass in coordinate is valid general position
     */
    protected isValidPosition(targetPoint: Point): boolean {
        // 不得离开地图
        if (targetPoint.getY() >= 1 && targetPoint.getY() <= 10) {
            if (targetPoint.getX() >= 1 && targetPoint.getX() <= 9)
                return true;
        }
        // 以上条件不满足，则return false.
        return false;
    }


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

    // 可以走的点位
    movablePoints() {
        let moveable_points: Point[] = [];
        moveable_points = moveable_points.concat(this.checkMoves());
        console.log("movable points:")
        console.log(moveable_points)
        return moveable_points;
    }

    //returns the grids that the General can go in a row
    private checkMoves() {
        Log.trace("in checkMoves()")
        // let Y_coor = this.point.y_coor
        let X_coor = this.point.getX();
        let Y_coor = this.point.getY();


        // 左前-11点钟
        let front_left_upper = new Point(-1, -1); // WHY: 如果不建一个点，try catch里面的会是局部变量
        let front_left_upper_block = this.board.getPointFromCoordinates(X_coor, Y_coor - 1);

        // 左前-10点钟
        let front_left_lower = new Point(-1, -1);
        let front_left_lower_block = this.board.getPointFromCoordinates(X_coor - 1, Y_coor);

        // 右前-1点钟
        let front_right_upper = new Point(-1, -1);
        let front_right_upper_block = this.board.getPointFromCoordinates(X_coor, Y_coor - 1);

        // 右前-2点钟
        let front_right_lower = new Point(-1, -1);
        let front_right_lower_block = this.board.getPointFromCoordinates(X_coor + 1, Y_coor);

        // 左后-8点 
        let back_left_upper = new Point(-1, -1); // WHY: 如果不建一个点，try catch里面的会是局部变量
        let back_left_upper_block = this.board.getPointFromCoordinates(X_coor - 1, Y_coor);

        // 左后-7点
        let back_left_lower = new Point(-1, -1);
        let back_left_lower_block = this.board.getPointFromCoordinates(X_coor, Y_coor + 1);

        // 右后-上
        let back_right_upper = new Point(-1, -1);
        let back_right_upper_block = this.board.getPointFromCoordinates(X_coor + 1, Y_coor);

        // 右后-下
        let back_right_lower = new Point(-1, -1);
        let back_right_lower_block = this.board.getPointFromCoordinates(X_coor, Y_coor + 1);


        // 没有挡马眼的阻碍才能走
        // In the following graphs, 'S' means Starting Point, 'B' means Block while 'E' means Ending Point. 

        // E__
        // |  |
        // |__|
        // |  B
        // |__|
        //    S
        try {
            if (!front_left_upper_block.piece)
                front_left_upper = this.board.getPointFromCoordinates(X_coor - 1, Y_coor - 2);
        } catch (e) {
            console.log(e)
        }

        //E____________
        //|     |     |
        //|_____|B____|
        //            S
        try {
            if (!front_left_lower_block.piece)
                front_left_lower = this.board.getPointFromCoordinates(X_coor - 2, Y_coor - 1);
        } catch (e) {
            console.log(e)

        }


        //   __E
        //  |  |
        //  |__|
        //  B  |
        //  |__|
        // S   
        try {
            if (!front_right_upper_block.piece)
                front_right_upper = this.board.getPointFromCoordinates(X_coor + 1, Y_coor - 2)
        }
        catch (e) {
            console.log(e)
        }

        // ___________E
        //|     |     |
        //|_____|_____|
        //S     B     
        try {

            if (!front_right_lower_block.piece)
                front_right_lower = this.board.getPointFromCoordinates(X_coor + 2, Y_coor - 1)

        } catch (e) {
            console.log(e)
        }

        // ==========================================================


        // _____B_____S
        //|     |     |
        //|_____|_____|
        //E           
        try {
            if (!back_left_upper_block.piece)
                back_left_upper = this.board.getPointFromCoordinates(X_coor - 2, Y_coor + 1);
        } catch (e) {
            console.log(e)
        }

        //  __S
        // |  |
        // |__|
        // |  B
        // |__|
        // E   
        try {
            if (!back_left_lower_block.piece)
                back_left_lower = this.board.getPointFromCoordinates(X_coor - 1, Y_coor + 2);
        } catch (e) {
            console.log(e)
        }




        //  S__
        //  |  |
        //  |__|
        //  B  |
        //  |__|
        //     E
        try {
            if (!back_right_lower_block.piece)
                back_right_lower = this.board.getPointFromCoordinates(X_coor + 1, Y_coor + 2)
        }
        catch (e) {
            console.log(e)
        }

        //S_____B_____
        //|     |     |
        //|_____|_____|
        //            E
        try {

            if (!back_right_upper_block.piece)
                back_right_upper = this.board.getPointFromCoordinates(X_coor + 2, Y_coor + 1)

        } catch (e) {
            console.log(e)
        }





        let movable_points_in_this_column: Point[] = [];

        //  __ __   
        // |__|__|
        // |__|__|

        // 

        console.log("++++++++++++++++++++++ debug +++++++++++++++++++++++")
        console.log(front_left_upper)
        console.log(front_left_lower)
        console.log(front_right_upper)
        console.log(front_right_lower)
        console.log(back_left_upper)
        console.log(back_left_lower)

        // 左前-上
        if (front_left_upper && this.isValidPosition(front_left_upper)) {
            movable_points_in_this_column.push(front_left_upper)
        }
        // 左前-下
        if (front_left_lower && this.isValidPosition(front_left_lower)) {
            movable_points_in_this_column.push(front_left_lower)
        }

        // 右前-上
        if (front_right_upper && this.isValidPosition(front_right_upper)) {
            movable_points_in_this_column.push(front_right_upper)
        }

        // 右前-下
        if (front_right_lower && this.isValidPosition(front_right_lower)) {
            movable_points_in_this_column.push(front_right_lower)
        }

        // 左后-上
        if (back_left_upper && this.isValidPosition(back_left_upper)) {
            movable_points_in_this_column.push(back_left_upper)
        }

        // 左后-下
        if (back_left_lower && this.isValidPosition(back_left_lower)) {
            movable_points_in_this_column.push(back_left_lower)
        }


        // 右后-上
        if (back_right_upper && this.isValidPosition(back_right_upper)) {
            movable_points_in_this_column.push(back_right_upper)
        }

        // 右后-下
        if (back_right_lower && this.isValidPosition(back_right_lower)) {
            movable_points_in_this_column.push(back_right_lower)
        }

        console.log("========================= movable_points_in_this_column")

        console.log(movable_points_in_this_column)

        return movable_points_in_this_column;

    }

}

class BlackKnight extends Knight {

    protected board: Board;

    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.BLACK);
        this.elem.src = '../img/pieces/black-ma.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.


        $(this.elem).on('click', () => {
            super.movablePoints();
        });
    }
}

class RedKnight extends Knight {

    protected board: Board;

    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.RED);
        this.elem.src = '../img/pieces/red-ma.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.


        $(this.elem).on('click', () => {
            super.movablePoints();
        });
    }
}
export {
    BlackKnight,
    RedKnight
}