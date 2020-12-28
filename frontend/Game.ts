import { Board } from "./board";
import { Point,PlayerColor } from "./frontend-utils";
import { BlackGeneral, RedGeneral } from "./General";
import Log from "../src/Util";
class Game {

    private currentPlayer!: PlayerColor ;

    private board: Board;
    // Stub constructor to be a placeholder
    constructor() {
        this.board = new Board();
    }

    // public canMove( p_from:Point,p_to:Point){
        
    //     Log.trace('Judging from which is the current player,')
    //     Log.trace('the move logic of the piece chosen')
    //     Log.trace('canMove() returns a bool whether the piece can move or not.')
        
    //     let bool_can_move_result
    // }


    // gets the public player
    public getCurrentPlayer(){
        return this.currentPlayer
    }

    //switch current player to the other player
    public alternatePlayer(){
        if(this.currentPlayer === PlayerColor.red)
            this.currentPlayer = PlayerColor.black;
        else
            this.currentPlayer = PlayerColor.red;
    }


    render() {
        this.board.render();
        // let black_jiang = new General(board, new Point(0, 4),PieceColor.black)
        let red_shuai = new RedGeneral(this.board, new Point(this.board,5, 2));
        red_shuai.render();

        let black_jiang = new BlackGeneral(this.board, new Point(this.board,5,1));
        black_jiang.render();
    }
}



const game = new Game();
game.render();


// $(window).resize(function () {
//     $('#board').css($('#board').css('height'),$('#board').css('width'))
// });
