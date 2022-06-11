import { Board } from "./Boards";
import { Piece } from "./ChessPieces/ChessPiece"
import { RedRook, BlackRook } from "./ChessPieces/Rook";
import { Point, PlayerColor, fitSize } from "./frontend-utils";
import { BlackKing, RedKing } from "./ChessPieces/King";
import { BlackCannon, RedCannon } from "./ChessPieces/Cannon";


import { RedPawn, BlackPawn } from './ChessPieces/Pawn'


import { RedAdvisor, BlackAdvisor } from './ChessPieces/Advisor';
import { BlackWarElephant, RedWarElephant } from './ChessPieces/Bishop'

import { BlackKnight, RedKnight } from './ChessPieces/Knight';

import { FenNotation } from './utils/FenNotation';



class Game {
    private currentPlayer: PlayerColor; // 红方先行  Player RED goes first.

    private board: Board;               // 唯一的棋盘   The only Chessborad of the Game
    private full_move_counts: number;   // Counts how many rounds has passed

    private chess_pieces: Piece[] = []; // 所有的棋子放进Array里面，便于删除

    constructor() {
        this.currentPlayer = PlayerColor.RED;
        this.board = new Board(this);
        this.full_move_counts = 1
    }

    // gets the public player
    // 获取当前玩家
    public getCurrentPlayer(): PlayerColor {
        return this.currentPlayer;
    }

    public  getChessPieces(){
        return this.chess_pieces;
    }

    public getBoard(): Board {
        return this.board;
    }

    //Switch current player to the other player
    //到另一个人下
    public alternatePlayer(): void {

        if (this.currentPlayer === PlayerColor.RED) {
            this.full_move_counts++;                   //轮到红棋移动的时候，步数+1
            this.currentPlayer = PlayerColor.BLACK;
        }
        else { this.currentPlayer = PlayerColor.RED; }

    }


    public initializePieces(): void {
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
        let red_shuai = new RedKing(this.board, this.board.getPointFromCoordinates(5, 10)); //new Point() doesn't make sense.
        let black_jiang = new BlackKing(this.board, this.board.getPointFromCoordinates(5, 1)); // using getPoint from coor now
        this.chess_pieces.push(red_shuai);
        this.chess_pieces.push(black_jiang);

        // 红车    Red Chariots
        let red_ju_one = new RedRook(this.board, this.board.getPointFromCoordinates(1, 10));
        let red_ju_two = new RedRook(this.board, this.board.getPointFromCoordinates(9, 10));
        this.chess_pieces.push(red_ju_one);
        this.chess_pieces.push(red_ju_two);

        // 黑车  Black Chariots
        let black_ju_one = new BlackRook(this.board, this.board.getPointFromCoordinates(1, 1));
        let black_ju_two = new BlackRook(this.board, this.board.getPointFromCoordinates(9, 1));
        this.chess_pieces.push(black_ju_one);
        this.chess_pieces.push(black_ju_two);


        // 红炮 RedCannons
        let red_cannon_one = new RedCannon(this.board, this.board.getPointFromCoordinates(2, 8))
        let red_cannon_two = new RedCannon(this.board, this.board.getPointFromCoordinates(8, 8))
        this.chess_pieces.push(red_cannon_one);
        this.chess_pieces.push(red_cannon_two);


        // 黑炮 BlackCannon
        let black_cannon_one = new BlackCannon(this.board, this.board.getPointFromCoordinates(2, 3))
        let black_cannon_two = new BlackCannon(this.board, this.board.getPointFromCoordinates(8, 3))
        this.chess_pieces.push(black_cannon_one);
        this.chess_pieces.push(black_cannon_two);


        // 兵、卒 P/p
        let red_bing_one = new RedPawn(this.board, this.board.getPointFromCoordinates(1, 7));
        let red_bing_two = new RedPawn(this.board, this.board.getPointFromCoordinates(3, 7));
        let red_bing_three = new RedPawn(this.board, this.board.getPointFromCoordinates(5, 7));
        let red_bing_four = new RedPawn(this.board, this.board.getPointFromCoordinates(7, 7));
        let red_bing_five = new RedPawn(this.board, this.board.getPointFromCoordinates(9, 7));
        this.chess_pieces.push(red_bing_one);
        this.chess_pieces.push(red_bing_two);
        this.chess_pieces.push(red_bing_three);
        this.chess_pieces.push(red_bing_four);
        this.chess_pieces.push(red_bing_five);

        let black_zu_one = new BlackPawn(this.board, this.board.getPointFromCoordinates(1, 4));
        let black_zu_two = new BlackPawn(this.board, this.board.getPointFromCoordinates(3, 4));
        let black_zu_three = new BlackPawn(this.board, this.board.getPointFromCoordinates(5, 4));
        let black_zu_four = new BlackPawn(this.board, this.board.getPointFromCoordinates(7, 4));
        let black_zu_five = new BlackPawn(this.board, this.board.getPointFromCoordinates(9, 4));
        this.chess_pieces.push(black_zu_one);
        this.chess_pieces.push(black_zu_two);
        this.chess_pieces.push(black_zu_three);
        this.chess_pieces.push(black_zu_four);
        this.chess_pieces.push(black_zu_five);


        // 红士 A
        let red_advisor_one = new RedAdvisor(this.board, this.board.getPointFromCoordinates(4, 10));
        let red_advisor_two = new RedAdvisor(this.board, this.board.getPointFromCoordinates(6, 10));
        this.chess_pieces.push(red_advisor_one);
        this.chess_pieces.push(red_advisor_two);

        // 黑仕 a
        let black_advisor_one = new BlackAdvisor(this.board, this.board.getPointFromCoordinates(4, 1))
        let black_advisor_two = new BlackAdvisor(this.board, this.board.getPointFromCoordinates(6, 1))
        this.chess_pieces.push(black_advisor_one);
        this.chess_pieces.push(black_advisor_two);

        // 黑象 b
        let black_elephant_one = new BlackWarElephant(this.board, this.board.getPointFromCoordinates(3, 1))
        let black_elephant_two = new BlackWarElephant(this.board, this.board.getPointFromCoordinates(7, 1))
        this.chess_pieces.push(black_elephant_one);
        this.chess_pieces.push(black_elephant_two);


        // 红象 B
        let red_elephant_one = new RedWarElephant(this.board, this.board.getPointFromCoordinates(3, 10))
        let red_elephant_two = new RedWarElephant(this.board, this.board.getPointFromCoordinates(7, 10))
        this.chess_pieces.push(red_elephant_one);
        this.chess_pieces.push(red_elephant_two);


        // 黑马 n
        let black_calvalry_one = new BlackKnight(this.board, this.board.getPointFromCoordinates(2, 1))
        let black_calvalry_two = new BlackKnight(this.board, this.board.getPointFromCoordinates(8, 1))
        this.chess_pieces.push(black_calvalry_one);
        this.chess_pieces.push(black_calvalry_two);

        // 红马 N
        let red_calvalry_one = new RedKnight(this.board, this.board.getPointFromCoordinates(2, 10))
        let red_calvalry_two = new RedKnight(this.board, this.board.getPointFromCoordinates(8, 10))
        this.chess_pieces.push(red_calvalry_one);
        this.chess_pieces.push(red_calvalry_two);
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 棋子初始化 Initialization of ChessPieces ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

        // forEach 渲染法
        for (let item of this.chess_pieces) {
            item.render()
        }
    }

    // 删除所有的棋子
    public destroyPieces(): void {
        // forEach 删除法
        for (let item of this.chess_pieces) {
            item.destroy()
        }
    }



    public render(): void {
        this.board.render(); // 渲染棋盘
        this.initializePieces(); // 渲染棋子
    }

    public restart(): void {
        this.destroyPieces();
        this.initializePieces();
    }

    public getFullMoveCounts() {
        return this.full_move_counts;
    }

    // public getFenString() {

    //     let current_color = 'w'
    //     if (this.currentPlayer == PlayerColor.RED) {
    //         current_color = 'w'
    //     }
    //     else {
    //         current_color = 'b'
    //     }


    //     let ret_val = new FenNotation(
    //         this.board.getPiecePlacementString(),
    //         current_color,
    //         '-',
    //         '-',
    //         0,
    //         this.getFullMoveCounts(),
    //     )

    //     return ret_val;
    // }

}

var game = new Game;

const newGame = new Promise<Game>((resolve, reject) => {
    
    game.render();
    resolve(game);

}) 

newGame.then((game)=>{
    try{ 

        console.log("game.getChessPieces()")
        console.log(game.getChessPieces())

        setTimeout(() => {
            game.getChessPieces()[0].moveToPoint(game.getBoard().getPointFromCoordinates(5,9));

        }, 1000);

    
    }
    catch(e){
        console.error(e)
    } 
 
})



 


// game.render();
// game.destroy();




fitSize()

export {
    Game
}