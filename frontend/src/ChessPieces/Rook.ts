import Log from "../../../src/Util";
import { Board } from "../Boards";
import { Piece, PieceRole, PlayerColor } from "./ChessPiece";
import { Point } from "../frontend-utils";

abstract class Rook extends Piece {

    constructor(
        point: Point,
        board: Board,
        color: PlayerColor
    ) {
        super(point, board, PieceRole.Chariot, color);
    }



    /**
     * 
     * @param x 
     * @param y 
     * @returns boolean to indicate if the pass in coordinate is valid general position
     */
    protected abstract isValidChariotPosition(x: number, y: number): boolean;


    public canMove(dest: Point): boolean {
        let x = dest.x_coor;
        let y = dest.y_coor;

        //If the dest is not inside of the "田" shaped space of the board
        //Returns false.
        if (!this.isValidChariotPosition(x, y))
            return false;

        //If the place is outside of reach from the General,
        //It returns false.
        if (Math.abs(x - this.point.x_coor) > 1 || Math.abs(y - this.point.y_coor) > 1)
            return false;



        // We will add more logic for checking valid move later
        // Current check is only for a valid position and no same side piece
        return !super.checkSameColorPieceInPoint(dest);
    }

}

class RedRook extends Rook {

    protected board: Board;
    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.RED);
        this.elem.src = '../img/pieces/red-ju.png';
        this.board = board;

        this.point.setPiece(this); //sets the piece to the point.



        $(this.elem).on('click', () => {
            // Log.trace("invoked this.checkColumns()")
            // Log.trace(this.checkColumn())
            // Log.trace(this.checkRow())

            this.movablePoints()



        });

    }
    movablePoints() {
        // Log.trace('inside this.movablePoints()')


        let moveable_points: Point[] = [];
        // moveable_points.length = 0;

        moveable_points = moveable_points.concat(this.checkRow());
        moveable_points = moveable_points.concat(this.checkColumn());



        // Log.trace('moveable_points is empty here !!!!')
        // Log.trace(moveable_points)
        return moveable_points

    }

    //returns the grids that General can go in a column
    private checkColumn() {
        Log.trace("in checkColumns")
        let Y_coor = this.point.y_coor
        let X_coor = this.point.x_coor

        let piece_col = this.board.getColFromXCoordinate(this.point.x_coor); //Checks the points in this column
        let piece_row = this.board.getRowFromYCoordinate(this.point.y_coor);//Checks the points in this row

        let start_flag: number = 0; //row 1
        let end_flag: number = 9;   //row 10 

        //trasversing the column (Point [])
        for (let index in piece_col) {
            //if the piece in that point is not null, do some checking
            if (piece_col[index].piece != null) {
                //checks the indices that are smaller than the point
                if (parseInt(index) < Y_coor - 1) {
                    //if the point holds a friendly piece:
                    if (piece_col[index].piece.color == PlayerColor.RED)
                        start_flag = parseInt(index) + 1; // the index is not added, but the next one is.
                    else
                        start_flag = parseInt(index)

                    if (start_flag === Y_coor - 1) // if a friendly piece is blocking right abovbe it
                        start_flag = Y_coor       // start_flag is set to the next row 

                    // Log.trace("start_flag:" + start_flag)
                }
                //checks those larger than that point
                else if (parseInt(index) > Y_coor - 1) {
                    //if the point holds a friendly piece:
                    if (piece_col[index].piece.color == PlayerColor.RED)
                        end_flag = parseInt(index) - 1; // the index is not added, but the last one is.
                    else
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
        for (let index in piece_row) {

            //if the piece in that point is not null, do some checking
            // 判定敌友
            if (piece_row[index].piece != null) {
                //checks the indices that are smaller than the point
                // 车的左边
                if (parseInt(index) < X_coor - 1) {
                    //if the point holds a friendly piece:
                    if (piece_row[index].piece.color == PlayerColor.RED)
                        start_flag = parseInt(index) + 1; // the index is not added, but the next one is.
                    else
                        start_flag = parseInt(index)

                    if (start_flag === X_coor - 1) // if a friendly piece is blocking right above it
                        start_flag = X_coor       // start_flag is set to the next row 

                    Log.trace("start_flag:" + start_flag)
                }

                //checks those larger than that point
                else if (parseInt(index) > X_coor - 1) {
                    //if the point holds a friendly piece:
                    if (piece_row[index].piece.color == PlayerColor.RED)
                        end_flag = parseInt(index) - 1; // the index is not added, but the last one is.
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
                // Log.trace('skip');
                continue
            }
            movable_points_in_this_row.push(piece_row[i]);
        }



        return movable_points_in_this_row

    }

    protected isValidChariotPosition(x: number, y: number) {
        return (y >= 8) && (y <= 10) && (x >= 4) && (x <= 6)
        // && !(x > 0 && y > 0);
    }
}


class BlackRook extends Rook {

    protected board: Board;

    constructor(board: Board, point: Point) {
        super(point, board, PlayerColor.BLACK);
        this.elem.src = '../img/pieces/black-ju.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.


        $(this.elem).on('click', () => {
            // Log.trace("invoked this.checkColumns()")
            // Log.trace(this.checkColumn())
            // Log.trace(this.checkRow())

            this.movablePoints()



        });


    }





    movablePoints() {
        // Log.trace('inside this.movablePoints()')


        let moveable_points: Point[] = [];
        // moveable_points.length = 0;
        moveable_points = moveable_points.concat(this.checkRow());
        moveable_points = moveable_points.concat(this.checkColumn());



        // Log.trace('moveable_points is empty here !!!!')
        // Log.trace(moveable_points)
        return moveable_points

    }

    //returns the grids that General can go in a column
    private checkColumn() {
        Log.trace("in checkColumns")
        Log.trace("Chariots")
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
                    if (piece_row[index].piece.color == PlayerColor.BLACK) {

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
                    if (piece_row[index].piece.color == PlayerColor.BLACK)
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







    protected isValidChariotPosition(x: number, y: number) {
        return (y >= 0) && (y <= 10) && (x >= 0) && (x <= 9);
        // && !(x > 0 && y > 0);
    }


}

export {
    RedRook,
    BlackRook
}