import Log from "../../src/Util";
import { Board } from "../Boards";
import { Piece, PieceRole, PlayerColor } from "./ChessPiece";
import { Point } from "../frontend-utils";

abstract class Cannon extends Piece {

    constructor(
        point: Point,
        board: Board,
        color: PlayerColor
    ) {
        super(point, board, PieceRole.Cannon, color);
    }



    /**
     * 
     * @param x 
     * @param y 
     * @returns boolean to indicate if the pass in coordinate is valid general position
     */
    protected isValidCannonPosition(x: number, y: number) {
        return (y >= 0) && (y <= 10) && (x >= 0) && (x <= 9);
    }


    public canMove(dest: Point): boolean {
        let x = dest.x_coor;
        let y = dest.y_coor;

        //If the dest is not inside of the "田" shaped space of the board
        //Returns false.
        if (!this.isValidCannonPosition(x, y))
            return false;

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

        moveable_points = moveable_points.concat(this.checkRow());
        moveable_points = moveable_points.concat(this.checkColumn());

        moveable_points = moveable_points.concat(this.checkShellingRowLHS())  // HACK: reversed index trasversing
        moveable_points = moveable_points.concat(this.checkShellingRowRHS())

        moveable_points = moveable_points.concat(this.checkShellingColUpper()) // HACK: reversed index trasversing
        moveable_points = moveable_points.concat(this.checkShellingColLower())


        return moveable_points;
    }

    // 检查可以炮轰的地方
    private checkShellingRowLHS() {
        Log.trace("in checkShellingRowLHS()");
        Log.trace("Cannon");

        let X_coor = this.point.x_coor
        let piece_row = this.board.getRowFromYCoordinate(this.point.y_coor);//Checks the points in this row
        let cornerstone_flag = false;
        let shellable_points_in_this_column = []

        for (let index in piece_row) {
            let cur_idx = (8 - parseInt(index))  // 0 ~ 8
            console.log(cur_idx)

            if (cur_idx + 1 < X_coor) {

                Log.trace("正在检测该棋子的左侧")

                // 有任何一方的棋子
                if (piece_row[cur_idx].piece) {

                    // 有了炮台，下一个有棋子的格子就是可以走的
                    if (cornerstone_flag) {
                        shellable_points_in_this_column.push(piece_row[cur_idx]);
                        break; //只加一个点进去就结束了
                    }
                    // 没有炮台，这就是炮台
                    else if (!cornerstone_flag) {
                        cornerstone_flag = true; // the index is not added, but the next one is.
                        continue;
                    }
                }
            }
        }

        return shellable_points_in_this_column
    }

    // 检查可以炮轰的地方 RHS = right hand side 
    private checkShellingRowRHS() {
        Log.trace("in checkShelling()");
        Log.trace("Cannon");

        // let Y_coor = this.point.y_coor
        let X_coor = this.point.x_coor

        // let piece_col = this.board.getColFromXCoordinate(this.point.x_coor); //Checks the points in this column
        let piece_row = this.board.getRowFromYCoordinate(this.point.y_coor);//Checks the points in this row


        let cornerstone_flag = false;
        let target_point_flag = -1;

        let shellable_points_in_this_column = []

        for (let index in piece_row) {
            if (parseInt(index) + 1 > X_coor) {
                Log.trace("正在检测该棋子的右侧")

                // 有任何一方的棋子
                if (piece_row[index].piece) {

                    // 有了炮台，下一个有棋子的格子就是可以走的
                    if (cornerstone_flag) {
                        shellable_points_in_this_column.push(piece_row[index]);
                        break; //只加一个点进去就结束了
                    }
                    // 没有炮台，这就是炮台
                    else if (!cornerstone_flag) {
                        cornerstone_flag = true; // the index is not added, but the next one is.
                        continue;
                    }
                }
            }

        }

        return shellable_points_in_this_column
    }

    // 检查可以炮轰的地方
    private checkShellingColUpper() {
        Log.trace("in checkShellingColUpper()");
        Log.trace("Cannon");

        let Y_coor = this.point.y_coor

        let piece_col = this.board.getColFromXCoordinate(this.point.x_coor); //Checks the points in this column


        var cornerstone_flag = false;
        let cornerstone_point = new Point(-1, -1);
        let shellable_points_in_this_column: Point[] = []

        for (let index in piece_col) {
            let cur_idx = 9 - parseInt(index); // 0 ~ 9
            if (cur_idx + 1 < Y_coor) {
                Log.trace("正在检测该棋子的上方")

                // 有任何一方的棋子
                if (piece_col[cur_idx].piece) {
                    console.log('piece_col[index]piece_col[index] ===================++')
                    console.log(piece_col[cur_idx])

                    // 有了炮台，下一个有棋子的格子就是可以走的
                    if (cornerstone_flag) {
                        Log.trace("有炮台了，添加以下点：")
                        Log.trace(piece_col[cur_idx])
                        shellable_points_in_this_column.push(piece_col[cur_idx]);
                        break; //只加一个点进去就结束了
                    }
                    // 没有炮台，这就是炮台
                    else if (!cornerstone_flag) {
                        Log.trace("无炮台")

                        cornerstone_point = piece_col[cur_idx]
                        console.log("炮台找到了！：")
                        console.log(cornerstone_point);

                        cornerstone_flag = true; // the index is not added, but the next one is.
                        continue;
                    }
                }
            }

        }

        return shellable_points_in_this_column
    }

    private checkShellingColLower() {
        let Y_coor = this.point.y_coor
        // let X_coor = this.point.x_coor

        let piece_col = this.board.getColFromXCoordinate(this.point.x_coor); //Checks the points in this column
        // let piece_row = this.board.getRowFromYCoordinate(this.point.y_coor);//Checks the points in this row


        var cornerstone_flag = false;
        let cornerstone_point = new Point(-1, -1);

        let target_point_flag = -1;

        let shellable_points_in_this_column: Point[] = [];


        for (let index in piece_col) {

            // HACK 注意 coordinate 都是加过 1 的
            if (parseInt(index) + 1 > Y_coor) {

                Log.trace("正在检测该棋子的下方")

                // 检测到该点内有任何一方的棋子
                if (piece_col[index].piece) {
                    console.log('piece_col[index] ===================++')

                    console.log(piece_col[index]);
                    console.log("cornerstone_flag:");
                    console.log(cornerstone_flag);


                    // 有了炮台，下一个有棋子的格子就是可以走的
                    if (cornerstone_flag == true) {
                        Log.trace("有炮台了，正在添加以下点：");
                        Log.trace(piece_col[index]);

                        shellable_points_in_this_column.push(piece_col[index]);
                        break; //只加一个点进去就结束了
                    }
                    // 没有炮台，这就是炮台
                    else if (!cornerstone_flag) {

                        cornerstone_flag = true; // the index is not added, but the next that has a piece is.\

                        Log.trace("之前无炮台，现在有炮台了:")
                        cornerstone_point = piece_col[index];
                        console.log(cornerstone_flag)
                        console.log(cornerstone_point)
                        continue;
                    }
                }
            }
        }
        return shellable_points_in_this_column;

    }

    //returns the grids that General can go in a column
    private checkColumn() {
        Log.trace("in checkColumn()")
        Log.trace("Cannon")
        let Y_coor = this.point.y_coor
        // let X_coor = this.point.x_coor

        let piece_col = this.board.getColFromXCoordinate(this.point.x_coor); //Checks the points in this column
        // let piece_row = this.board.getRowFromYCoordinate(this.point.y_coor);//Checks the points in this row

        let start_flag: number = 0; //row 1
        let end_flag: number = 9;   //row 10 

        //trasversing the column (Point [])
        for (let index in piece_col) {
            Log.trace('piece_col:')
            Log.trace(piece_col)
            //if the piece in that point is not null, do some checking
            if (piece_col[index].piece != null) {
                Log.trace("有棋子")
                //checks the indices that are smaller than the point
                // 这颗待处理棋子在上方
                if (parseInt(index) < Y_coor - 1) {
                    //if the point holds a friendly piece:
                    if (piece_col[index].piece.color == PlayerColor.BLACK) {

                        Log.trace("队友在上方")
                        start_flag = parseInt(index) + 1; // the index is not added, but the next one is.

                    }
                    else if (piece_col[index].piece.color != PlayerColor.BLACK) {
                        start_flag = parseInt(index);
                        console.log("debugging...........................")
                        console.log(start_flag);
                    }

                    if (start_flag === Y_coor - 1) // if a friendly piece is blocking right abovbe it
                        start_flag = Y_coor       // start_flag is set to the next row 

                    // Log.trace("start_flag:" + start_flag)
                }
                //checks those larger than that point
                // 这颗待处理棋子在下方
                else if (parseInt(index) > Y_coor - 1) {
                    //if the point holds a friendly piece:
                    if (piece_col[index].piece.color == PlayerColor.BLACK)
                        end_flag = parseInt(index) - 1; // the index is not added, but the last one is.

                    // 是敌方棋子的话：
                    else if (piece_col[index].piece.color != PlayerColor.BLACK)
                        end_flag = parseInt(index)

                    if (end_flag === Y_coor - 1) // if a friendly piece is blocking right below it
                        end_flag = Y_coor - 2;  // start_flag is set to the next row 

                    // Log.trace("end_flag:" + end_flag)
                    break;
                }

            }
        }

        // an array to store all the movable points in a column
        let movable_points_in_this_column: Point[] = [];

        for (let i = start_flag; i <= end_flag; i++) {
            //If the coordinate is the one that piece is in
            //It does not push it into the array.
            if (Y_coor - 1 === i) {
                // Log.trace('skip');
                continue
            }
            movable_points_in_this_column.push(piece_col[i]);
        }



        console.log(movable_points_in_this_column);

        return movable_points_in_this_column
        // console.log(this.board.getColFromXCoordinate(X_coor));
    }

    //returns the grids that the General can go in a row
    private checkRow() {
        Log.trace("in checkRows()")
        // let Y_coor = this.point.y_coor
        let X_coor = this.point.x_coor

        // let piece_col = this.board.getColFromXCoordinate(this.point.x_coor); //Checks the points in this column
        let piece_row = this.board.getRowFromYCoordinate(this.point.y_coor);//Checks the points in this row

        let start_flag: number = 0;
        let end_flag: number = 8;

        //trasversing the column (Point [])
        //遍历横行
        for (let index in piece_row) {
            //if the piece in that point is not null, do some checking
            //发现该点内有棋子，判断是敌是友
            if (piece_row[index].piece != null) {
                Log.trace("有棋子")
                Log.trace(piece_row)
                //checks the indices that are smaller than the point
                // 该枚车的左边
                if (parseInt(index) < X_coor - 1) {
                    //if the point holds a friendly piece:
                    if (piece_row[index].getPiece().isFriendly()) {

                        console.log("---------------------------------debug-----------------------------")
                        start_flag = parseInt(index) + 1; // the index is not added, but the next one is.
                    }
                    else
                        start_flag = parseInt(index)

                    if (start_flag === X_coor - 1) // if a friendly piece is blocking immediately left to it
                        start_flag = X_coor        // start_flag is set to the next row 

                    Log.trace("start_flag:" + start_flag)
                }
                //checks those larger than that point
                // 检查该车的右边
                else if (parseInt(index) > X_coor - 1) {
                    //if the point holds a friendly piece:
                    if (piece_row[index].getPiece().isFriendly())
                        end_flag = parseInt(index) - 1; // Friendly blocking: the index is not added, but the previous one is.
                    else
                        end_flag = parseInt(index)


                    if (end_flag === X_coor - 1) // if a friendly piece is blocking right below it
                        end_flag = X_coor - 2;  // start_flag is set to the next row 

                    Log.trace("end_flag:" + end_flag)
                    break;
                }

            }
        }

        // an array to store all the movable points in a column
        let movable_points_in_this_row: Point[] = [];

        for (let i = start_flag; i <= end_flag; i++) {
            //If the coordinate is the one that piece is in
            //It does not push it into the array.
            if (X_coor - 1 === i) {

                continue
            }
            movable_points_in_this_row.push(piece_row[i]);
        }
        console.log(movable_points_in_this_row);
        return movable_points_in_this_row

    }









}

class BlackCannon extends Cannon {

    protected board: Board;

    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.BLACK);
        this.elem.src = '../img/pieces/black-pao.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.


        $(this.elem).on('click', () => {
            super.movablePoints();
        });
    }

    // protected isValidCannonPosition(x: number, y: number) {
    //     return (y >= 0) && (y <= 10) && (x >= 0) && (x <= 9);
    // }

}

class RedCannon extends Cannon {

    protected board: Board;

    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.RED);
        this.elem.src = '../img/pieces/red-pao.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.


        $(this.elem).on('click', () => {
            super.movablePoints();
        });
    }



}


export {
    RedCannon,
    BlackCannon
}