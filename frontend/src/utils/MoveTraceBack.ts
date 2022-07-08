// 阿拉伯数字暗示是黑棋
// 中文数字则是红棋

import { PieceRole } from '../ChessPieces/ChessPiece';
import { PlayerColor, Point } from '../frontend-utils'


enum BIG_EVENT {
    'KILL',       // 吃
    'CHECK',      // 将军
    'WIN',        // 某一方胜利
    'SURRENDER',  // 某一方投降
}


// 走的一步
class MoveRecord {
    playerColor: PlayerColor | null;
    pieceRole: string | null;
    startPoint: Point | null;
    endPoint: Point | null;


    constructor(
        playerColor: PlayerColor, // 谁走的
        pieceRole: string | null, //     // 什么棋子
        startPoint: Point,        // 从哪里
        endpoint: Point           // 到哪里

    ) {
        this.playerColor = playerColor;
        this.startPoint = startPoint;
        this.pieceRole = pieceRole;
        this.endPoint = endpoint;
    }
}

class BigEvent {
    move: MoveRecord | null;   // 移动记录
    event: BIG_EVENT;          // 事件中的任何一种

    constructor(
        move: MoveRecord,
        event: BIG_EVENT
    ) {
        this.move = move;
        this.event = event;
    }
}

class MoveRecorder {
    list: MoveRecord[];

    constructor() {
        this.list = [];
    }

    // save this move record to the linked list
    public pushMoveRecord(move: MoveRecord) {
        this.list.push(move)
    }


}



