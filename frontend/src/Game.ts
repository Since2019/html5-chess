import Log from "../Util";
import { Board } from "./Boards";
import { RedChariot,BlackChariot } from "./Chariot";
import { Point,PlayerColor } from "./frontend-utils";
import { BlackGeneral, RedGeneral } from "./General";


class Game {
    private currentPlayer: PlayerColor; // 红方先行  Player RED goes first.

    private board: Board; // 唯一的棋盘   The only Chessborad of the Game

    constructor() {
        this.currentPlayer = PlayerColor.RED;
        this.board = new Board(this);
    }

    // gets the public player
    // 获取当前玩家
    public getCurrentPlayer(): PlayerColor {
        return this.currentPlayer;
    }

    //Switch current player to the other player
    //到另一个人下
    public alternatePlayer(): void {
        if(this.currentPlayer === PlayerColor.RED)
            this.currentPlayer = PlayerColor.BLACK;
        else
            this.currentPlayer = PlayerColor.RED;
    }

    
    public render(): void {

        this.board.render();

        

        // ============================= 棋子初始化 Initialization of ChessPieces =====================================================
        //                               先横坐标后纵坐标
        //                              1 2 3 4 5 6 7 8 9
        //                              2
        //                              3
        //                              4
        //                              5

        //                              6
        //                              7
        //                              8
        //                              9
        //                              10
                 
        // 将/帅   Generals:
        let red_shuai = new RedGeneral(this.board, this.board.getPointFromCoordinates(5,10)); //new Point() doesn't make sense.
        red_shuai.render();

        let black_jiang = new BlackGeneral(this.board, this.board.getPointFromCoordinates(5,1)); // using getPoint from coor now
        black_jiang.render();

        // 红车    Red Chariots
        let red_ju_one = new RedChariot(this.board, this.board.getPointFromCoordinates(1,10));
        let red_ju_two = new RedChariot(this.board, this.board.getPointFromCoordinates(9,10));

        // let red_ju_test = new RedChariot(this.board, this.board.getPointFromCoordinates(9,3));
        // let red_ju_test2 = new RedChariot(this.board, this.board.getPointFromCoordinates(9,4));

        // 黑车    Black Chariots
        let black_ju_one = new BlackChariot(this.board, this.board.getPointFromCoordinates(1,1));
        let black_ju_two = new BlackChariot(this.board, this.board.getPointFromCoordinates(9,1));

        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 棋子初始化 Initialization of ChessPieces ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


        // 红车
        red_ju_one.render();
        red_ju_two.render();
        
        // 黑车
        black_ju_one.render();
        black_ju_two.render();

        
        // red_ju_test.render();
        // red_ju_test2.render();

    }
}



const game = new Game();

game.render();

export {
    Game
}