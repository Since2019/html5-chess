import {SocketIoServer} from "./SocketIoServer"
import {Socket} from "socket.io"

/* 
    玩家每一个 socket 都存在这个 Array 当中
    服务器 socket 将会emit信息到相应的一对socket当中
**/

// [OpponentPlayer1, OpponentPlayer2, ...]
class PlayerSocketArray {
    // SocketIoServer将会是唯一的Server Socket
    private io: SocketIoServer;

    private gameArray : Array<OpponentPlayers>;

    constructor(io: SocketIoServer) {

    }

    // 
    public paring( newPlayer : ChessPlayer){    
        // 遍历这个数组，寻找孤单的玩家
        for(let i = 0; i < this.gameArray.length; i++){
            //帮孤单的玩家配对
            if(!this.gameArray[i].player2){
                this.gameArray[i].player2 = newPlayer;
            }          
        }
        // 遍历结束，所有棋局都满人，则开一个新的对局
        this.gameArray.push(new OpponentPlayers(newPlayer));

    }

}

// [ChessPlayer1, ChessPlayer2]
class OpponentPlayers{
    public player1 : ChessPlayer;
    public player2 : ChessPlayer;

    constructor(player1: ChessPlayer, player2?:ChessPlayer ){
        this.player1 = player1;

        if(player2){
            this.player2 = player2;
        }
        
    }
}

// 玩家的名字以及client socket
class ChessPlayer{
    public playerName: string;
    private socket : Socket;
}


