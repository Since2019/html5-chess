import { Board } from "./board";
import { Point,PlayerColor } from "./frontend-utils";
import { BlackGeneral, RedGeneral } from "./General";
class Game {

    private currentPlayer!: PlayerColor ;

    private board: Board;
    // Stub constructor to be a placeholder
    constructor() {
        this.board = new Board();
    }

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

        let red_shuai = new RedGeneral(this.board, this.board.getPointFromCoordinates(5,2)); //new Point() doesn't make sense.
        red_shuai.render();

        let black_jiang = new BlackGeneral(this.board, this.board.getPointFromCoordinates(5,1)); // using getPoint from coor now
        black_jiang.render();
    }
}



const game = new Game();
game.render();
