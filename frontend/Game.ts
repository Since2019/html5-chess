import { Board } from "./board";
import { Point } from "./frontend-utils";
import { RedGeneral } from "./General";

class Game {

    private board: Board;
    // Stub constructor to be a placeholder
    constructor() {
        this.board = new Board();
    }


    render() {
        this.board.render();
        // let black_jiang = new General(board, new Point(0, 4),PieceColor.black)
        let red_shuai = new RedGeneral(this.board, new Point(9, 4));
        red_shuai.render();
    }
}

const game = new Game();
game.render();