import Log from "../../src/Util";
import { Board } from "./Boards";
import { Piece, PieceRole, PieceColor } from "./ChessPiece";
import { Point } from "./frontend-utils";

abstract class Chariot extends Piece {

    constructor(point: Point, board: Board, color: PieceColor) {
        super(point, board, PieceRole.General, color);

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
        return !super.checkSameColorPiece(dest);
    }

}

class RedChariot extends Chariot {

    protected board: Board;
    constructor(board: Board, point: Point) {
        super(point, board, PieceColor.RED);
        this.elem.src = '../img/pieces/red-ju.png';
        this.board = board;

        this.point.setPiece(this); //sets the piece to the point.
        


        $(this.elem).on('click',()=>{  
            
            this.checkColumns();
        });

    }

    //returns the grids that General can go in a column
    private checkColumns() {
        Log.trace("checkColumns")
        let Y_coor = this.point.y_coor
        let X_coor = this.point.x_coor

        let piece_col = this.board.getColFromXCoordinate(this.point.x_coor); //Checks the points in this column
        let piece_row  = this.board.getRowFromYCoordinate(this.point.y_coor);//Checks the points in this row

        let start_flag:number=0;
        let end_flag:number=0;
        
        //trasversing the column (Point [])
        for(let index in piece_col){
            //if the piece in that point is not null, do some checking
            if(piece_col[index].piece != null){
                //checks the indices that are smaller than the point
                if(parseInt(index) < Y_coor-1){
                    //if the point holds a friendly piece:
                    if(piece_col[index].piece.color == PieceColor.RED)
                        start_flag = parseInt(index) + 1; // the index is not added, but the next one is.
                    else
                        start_flag = parseInt(index)

                    if(start_flag === Y_coor - 1) // if a friendly piece is blocking right abovbe it
                        start_flag = Y_coor       // start_flag is set to the next row 

                    Log.trace("start_flag:" + start_flag)
                }
                //checks those larger than that point
                else if(parseInt(index) > Y_coor-1){
                    //if the point holds a friendly piece:
                    if(piece_col[index].piece.color == PieceColor.RED)
                        end_flag = parseInt(index) - 1 ; // the index is not added, but the last one is.
                    else
                        end_flag = parseInt(index)  

                        
                    if(end_flag === Y_coor - 1) // if a friendly piece is blocking right below it
                    start_flag = Y_coor - 2;  // start_flag is set to the next row 

                    Log.trace("end_flag:" + end_flag)
                    break;
                }

            }
        }

        let movable_points_in_this_column:Point[]= [];
        $.when(movable_points_in_this_column)
        .then(()=>{
            
            for(let i = start_flag; i <= end_flag; i++){
                
                if(Y_coor-1 === i ){
                    // Log.trace('skip');
                    continue
                    
                }
                movable_points_in_this_column.push(piece_col[i]);
            }
 
        })
        .then(()=>{
            Log.trace(movable_points_in_this_column)
        })


        

        // console.log(this.board.getColFromXCoordinate(X_coor));
    }

    //returns the grids that General can go in a row
    private checkRows() {
        let Y_coor = this.point.y_coor;
        let X_coor = this.point.x_coor;

        let front = this.board.getPointFromCoordinates(X_coor,Y_coor - 1);
        let back  = this.board.getPointFromCoordinates(X_coor,Y_coor + 1); //out of bound err
        if(front){

            console.log('front.getPiece()');
            console.log(front.getPiece());
        }

        console.log(this.board.getColFromXCoordinate(X_coor));

    }

    protected isValidChariotPosition(x: number, y: number) {
        return (y >= 8) && (y <= 10) && (x >= 4) && (x <= 6) && !(x>0 && y>0);
    }
}


class BlackChariot extends Chariot {

    constructor(board: Board, point: Point) {
        super(point, board, PieceColor.BLACK);
        this.elem.src = '../img/pieces/black-ju.png';
        this.board = board;
        this.point.setPiece(this); //sets the piece to the point.
    }

    protected isValidChariotPosition(x: number, y: number) {
        return (y >= 0) && (y <= 10) && (x >= 0) && (x <= 9) && !(x>0 && y>0);
    }


}

export {
    RedChariot,
    BlackChariot
}