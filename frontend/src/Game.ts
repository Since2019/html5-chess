import Log from "../Util";
import { Board } from "./Boards";
import { RedChariot,BlackChariot } from "./Chariot";
import { Point,PlayerColor } from "./frontend-utils";
import { BlackGeneral, RedGeneral } from "./General";
class Game {

    private currentPlayer: PlayerColor = PlayerColor.red;

    private board: Board;
    // Stub constructor to be a placeholder
    constructor() {
        this.board = new Board();
    }

    // gets the public player
    public getCurrentPlayer(): PlayerColor {
        return this.currentPlayer;
    }

    //switch current player to the other player
    public alternatePlayer(): void {
        if(this.currentPlayer === PlayerColor.red)
            this.currentPlayer = PlayerColor.black;
        else
            this.currentPlayer = PlayerColor.red;
    }


    public render(): void {
        this.board.render();

        
        let red_shuai = new RedGeneral(this.board, this.board.getPointFromCoordinates(5,10)); //new Point() doesn't make sense.
        red_shuai.render();

        let black_jiang = new BlackGeneral(this.board, this.board.getPointFromCoordinates(5,1)); // using getPoint from coor now
        black_jiang.render();


        let red_ju_one = new RedChariot(this.board, this.board.getPointFromCoordinates(1,1));
        let red_ju_two = new RedChariot(this.board, this.board.getPointFromCoordinates(9,1));

        let red_ju_test = new RedChariot(this.board, this.board.getPointFromCoordinates(9,3));
        let red_ju_test2 = new RedChariot(this.board, this.board.getPointFromCoordinates(9,4));

        let black_ju_one = new BlackChariot(this.board, this.board.getPointFromCoordinates(1,10));
        let black_ju_two = new BlackChariot(this.board, this.board.getPointFromCoordinates(9,10));

        red_ju_one.render();
        red_ju_two.render();
        black_ju_one.render();
        black_ju_two.render();

        red_ju_test.render();
        red_ju_test2.render();

    }
}



const game = new Game();

game.render();

