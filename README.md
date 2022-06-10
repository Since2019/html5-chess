# html5-chess


## Introduction 
中国象棋是一种具有悠久历史的益智游戏，据说是演化自古代的沙盘军事推演。
作为一种棋类游戏，它十分锻炼和考验玩家的预判能力，同时也锻炼记忆力以及照顾全局的思维方式。


### Instruction

The command for installing dependencies:
```sh
npm install
```

The command for running the App on localhost:
```sh
npm run start:dev
```
Compile to whole project by:
```sh
npm run build
```
Now we adopt webpack, no need to compile the whole project instead when we are working on frontend the webpack can
take care of compilation for us. Never invoke tsc directly and don't commit the compiled js file.

The compiled bundle.js should located in "frontend/", and we only refer to that script in our html
### Project Overwiew

This is a Chinese Chess game project built primarily based on ts/js and html5. Currently only a server is set up.

### Next step

Basic logic of chess board and chess


### Chess Engine
`https://www.xqbase.com/protocol/cchess_move.htm`


### Project Structure

- frontend : A folder that contains the UI part of the game
    - img  : The folder contians subfolders with images of the chesspieces and UI related pictures
    - src  : A folder that contains TypeScript Classes of the GamePieces and so on.
        - utils : FenNotations and TraceBack functions.
        - ChessPieces : Where ChessPiece and Game Related Classes are located.
            - Boards.ts  : ChessBoard Class
            - Game.ts    : Where Game Logic functions reside
            - frontend-utils.ts(Will be renamed to UI-utils.ts)

            <br />

            - Advisor.ts : 士/仕 
            - Cannon.ts  : 炮/砲
            - Cavalry.ts(Will be renamed to Knight) : 馬
            - Chariot.ts(Will be renamed to Rook) : 車
            - FootSoldier.ts (Will be renamed to Pawn)  : 兵/卒
            - WarElephants.ts (Will be renamed to Bishop): 相/象
            - General.ts (Will be renamed to King): 帥/將

            
