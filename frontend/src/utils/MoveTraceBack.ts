// 阿拉伯数字暗示是黑棋
// 中文数字则是红棋

import { PieceRole } from '../ChessPiece';
import { PlayerColor, Point } from '../frontend-utils'

// 走的一步
class MoveRecord {

    playerColor: PlayerColor;
    pieceRole: PieceRole;
    startPoint: Point;
    endPoint: Point;


    constructor() {
        this.playerColor = PlayerColor.NEUTRAL;
        this.startPoint = new Point(-1, -1);
        this.pieceRole = PieceRole.Elephant;
        this.endPoint = new Point(-1, -1);
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



