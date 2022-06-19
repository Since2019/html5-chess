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
        for(let i = 0; i < this.gameArray.length; i++){
            //孤单的玩家
            if(!this.gameArray[i].player2){
                this.gameArray[i].player2 = newPlayer;
            }
            else{

            }

        }
    }

}

// [ChessPlayer1, ChessPlayer2]
class OpponentPlayers{
    public player1 : ChessPlayer;
    public player2 : ChessPlayer;
}

// 玩家的名字以及client socket
class ChessPlayer{
    public playerName: string;
    private socket : Socket;
}


