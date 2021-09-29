import { Board } from "./Boards";
import { Piece, PieceRole, PlayerColor } from "./ChessPiece";
import { Point } from "./frontend-utils";

abstract class FootSoldier extends Piece {

    constructor(
        point: Point,
        board: Board,
        color: PlayerColor
    ) {
        super(point, board, PieceRole.Soldier, color);
    }

    /**
     * 
     * @param x 
     * @param y 
     * @returns boolean to indicate if the pass in coordinate is valid general position
     */


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

    protected isValidFootSoldierPosition(targetPoint: Point): boolean {
        return (targetPoint.getY() >= 1) && (targetPoint.getY() <= 10) && (targetPoint.getX() >= 1) && (targetPoint.getX() <= 9);
    }


}


class RedFootSoldier extends FootSoldier {

    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.RED);
        this.elem.src = '../img/pieces/red-bing.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.
    }

    movablePoints() {
        let moveable_points: Point[] = [];
        if (this.point.getY() <= 5) {
            console.log("过河后")
            moveable_points = moveable_points.concat(this.afterLanding());
        }
        else if (this.point.getY() >= 6) {
            console.log("过河前")
            moveable_points = moveable_points.concat(this.beforeLanding());
        }
        return moveable_points
    }

    // 渡河之前
    private beforeLanding() {
        let X_coor = this.point.getX();
        let Y_coor = this.point.getY();

        let front = this.board.getPointFromCoordinates(X_coor, Y_coor - 1)

        let movable_points_before_landing: Point[] = [];

        // 面前的格子
        if (front && this.isValidFootSoldierPosition(front)) {
            movable_points_before_landing.push(front)
        }

        return movable_points_before_landing;

    }


    // 渡河以后
    private afterLanding() {
        let X_coor = this.point.getX();
        let Y_coor = this.point.getY();

        let front = this.board.getPointFromCoordinates(X_coor, Y_coor - 1)
        // let back = this.board.getPointFromCoordinates(X_coor, Y_coor + 1) // Not one step back!
        let left = this.board.getPointFromCoordinates(X_coor - 1, Y_coor)
        let right = this.board.getPointFromCoordinates(X_coor + 1, Y_coor)

        let movable_points_after_landing: Point[] = [];

        // 面前的格子
        if (front && this.isValidFootSoldierPosition(front)) {
            movable_points_after_landing.push(front);
        }

        // 左边 
        if (left && this.isValidFootSoldierPosition(left)) {
            console.log('back.getPiece()');
            console.log(left.getPiece());
            movable_points_after_landing.push(left);
        }

        // 右边
        if (right && this.isValidFootSoldierPosition(right)) {
            console.log('back.getPiece()');
            console.log(right.getPiece());
            movable_points_after_landing.push(right);
        }

        return movable_points_after_landing;

    }
}


class BlackFootSoldier extends FootSoldier {

    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.BLACK);
        this.elem.src = '../img/pieces/black-zu.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.
    }

    movablePoints() {
        let moveable_points: Point[] = [];
        if (this.point.getY() <= 5) {
            console.log("过河前")
            moveable_points = moveable_points.concat(this.beforeLanding());


        }
        else if (this.point.getY() >= 6) {
            console.log("过河后")
            moveable_points = moveable_points.concat(this.afterLanding());
        }
        return moveable_points
    }

    // 渡河之前
    private beforeLanding() {
        let X_coor = this.point.getX();
        let Y_coor = this.point.getY();

        let front = this.board.getPointFromCoordinates(X_coor, Y_coor + 1)

        let movable_points_before_landing: Point[] = [];

        // 面前的格子
        if (front && this.isValidFootSoldierPosition(front)) {
            movable_points_before_landing.push(front)
        }

        return movable_points_before_landing;

    }


    // 渡河以后
    private afterLanding() {
        let X_coor = this.point.getX();
        let Y_coor = this.point.getY();

        let front = this.board.getPointFromCoordinates(X_coor, Y_coor + 1)
        // let back = this.board.getPointFromCoordinates(X_coor, Y_coor + 1) // Not one step back!
        let left = this.board.getPointFromCoordinates(X_coor - 1, Y_coor)
        let right = this.board.getPointFromCoordinates(X_coor + 1, Y_coor)

        let movable_points_after_landing: Point[] = [];

        // 面前的格子
        if (front && this.isValidFootSoldierPosition(front)) {
            movable_points_after_landing.push(front);
        }

        // 左边 
        if (left && this.isValidFootSoldierPosition(left)) {
            console.log('back.getPiece()');
            console.log(left.getPiece());
            movable_points_after_landing.push(left);
        }

        // 右边
        if (right && this.isValidFootSoldierPosition(right)) {
            console.log('back.getPiece()');
            console.log(right.getPiece());
            movable_points_after_landing.push(right);
        }

        return movable_points_after_landing;

    }
}

export {
    RedFootSoldier,
    BlackFootSoldier
}