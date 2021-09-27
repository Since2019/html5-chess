import Log from "../Util";
import { Board } from "./Boards";
import { RedChariot, BlackChariot } from "./Chariot";
import { Point, PlayerColor } from "./frontend-utils";
import { BlackGeneral, RedGeneral } from "./General";
import { BlackCannon, RedCannon } from "./Cannon"; './Cannon';

import { RedFootSoldier, BlackFootSoldier } from './FootSoldier'


import { RedAdvisor, BlackAdvisor } from './Advisor';
import { BlackWarElephant, RedWarElephant } from './WarElephant'

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
        if (this.currentPlayer === PlayerColor.RED)
            this.currentPlayer = PlayerColor.BLACK;
        else
            this.currentPlayer = PlayerColor.RED;
    }


    public render(): void {

        this.board.render(); // 渲染棋盘



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
        let red_shuai = new RedGeneral(this.board, this.board.getPointFromCoordinates(5, 10)); //new Point() doesn't make sense.
        red_shuai.render();

        let black_jiang = new BlackGeneral(this.board, this.board.getPointFromCoordinates(5, 1)); // using getPoint from coor now
        black_jiang.render();

        // 红车    Red Chariots
        let red_ju_one = new RedChariot(this.board, this.board.getPointFromCoordinates(1, 10));
        let red_ju_two = new RedChariot(this.board, this.board.getPointFromCoordinates(9, 10));

        // let red_ju_test = new RedChariot(this.board, this.board.getPointFromCoordinates(9,3));
        // let red_ju_test2 = new RedChariot(this.board, this.board.getPointFromCoordinates(9,4));

        // 黑车  Black Chariots
        let black_ju_one = new BlackChariot(this.board, this.board.getPointFromCoordinates(1, 1));
        let black_ju_two = new BlackChariot(this.board, this.board.getPointFromCoordinates(9, 1));


        // 红炮 RedCannons
        let red_cannon_one = new RedCannon(this.board, this.board.getPointFromCoordinates(8, 3))
        let red_cannon_two = new RedCannon(this.board, this.board.getPointFromCoordinates(8, 4))

        // 黑炮 BlackCannon
        let black_cannon_one = new BlackCannon(this.board, this.board.getPointFromCoordinates(2, 3))
        let black_cannon_two = new BlackCannon(this.board, this.board.getPointFromCoordinates(2, 4))


        // 兵、卒 FOOTSOLDIERS
        let red_bing_one = new RedFootSoldier(this.board, this.board.getPointFromCoordinates(1, 7));

        let black_zu_one = new BlackFootSoldier(this.board, this.board.getPointFromCoordinates(1, 4));


        // 红士 RedAdvisor
        let red_advisor_one = new RedAdvisor(this.board, this.board.getPointFromCoordinates(4, 10));
        let red_advisor_two = new RedAdvisor(this.board, this.board.getPointFromCoordinates(6, 10));

        // 黑仕 BlackAdvisor
        let black_advisor_one = new BlackAdvisor(this.board, this.board.getPointFromCoordinates(4, 1))
        let black_advisor_two = new BlackAdvisor(this.board, this.board.getPointFromCoordinates(6, 1))

        // 黑象
        let black_elephant_one = new BlackWarElephant(this.board, this.board.getPointFromCoordinates(3, 1))
        let black_elephant_two = new BlackWarElephant(this.board, this.board.getPointFromCoordinates(7, 1))

        // 红象
        let red_elephant_one = new RedWarElephant(this.board, this.board.getPointFromCoordinates(3, 10))
        let red_elephant_two = new RedWarElephant(this.board, this.board.getPointFromCoordinates(7, 10))
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 棋子初始化 Initialization of ChessPieces ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



        // 红车
        red_ju_one.render();
        red_ju_two.render();

        // 黑车
        black_ju_one.render();
        black_ju_two.render();


        // 炮
        red_cannon_one.render();
        red_cannon_two.render();

        black_cannon_one.render();
        black_cannon_two.render();

        // 红兵
        red_bing_one.render();

        // 黑兵
        black_zu_one.render();


        // 
        red_advisor_one.render();
        red_advisor_two.render();

        black_advisor_one.render();
        black_advisor_two.render();


        //黑象 black elephants
        black_elephant_one.render();
        black_elephant_two.render();

        // 
        red_elephant_one.render();
        red_elephant_two.render();

    }
}



const game = new Game();

game.render();

export {
    Game
}