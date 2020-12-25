import { Board } from "./board";
import { Point } from "./frontend-utils";
import { BlackGeneral, RedGeneral } from "./General";

class Game {

    private board: Board;
    // Stub constructor to be a placeholder
    constructor() {
        this.board = new Board();
    }


    render() {
        this.board.render();
        // let black_jiang = new General(board, new Point(0, 4),PieceColor.black)
        let red_shuai = new RedGeneral(this.board, new Point(4, 9));
        red_shuai.render();

        let black_jiang = new BlackGeneral(this.board, new Point(4,0));
        black_jiang.render();
    }
}



const game = new Game();
game.render();


// $(window).resize(function () {
//     $('#board').css($('#board').css('height'),$('#board').css('width'))
// });
