// 阿拉伯数字暗示是黑棋
// 中文数字则是红棋

import { PieceRole } from '../ChessPiece';
import {PlayerColor, Point} from '../frontend-utils'

// 走的一步
class MoveRecord{

    playerColor : PlayerColor;
    pieceRole   : PieceRole;
    startPoint : Point;


    constructor(){
        this.playerColor  = PlayerColor.NEUTRAL;
        this.startPoint = new Point(-1,-1);
        this.pieceRole = undefined; 
        this.endPoint = new Point(-1,-1);

    }
}



// save this move record to the linked list
function pushMoveRecord(move :MoveRecord){

}

