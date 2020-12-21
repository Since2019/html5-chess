var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//how many px when it's zoomed 100%
var SIDE_LENGTH = 5;
// used in class Piece
var PieceColor;
(function (PieceColor) {
    PieceColor[PieceColor["black"] = 0] = "black";
    PieceColor[PieceColor["red"] = 1] = "red";
})(PieceColor || (PieceColor = {}));
// used in class Game, 
var PlayerColor;
(function (PlayerColor) {
    PlayerColor[PlayerColor["black"] = 0] = "black";
    PlayerColor[PlayerColor["red"] = 1] = "red";
})(PlayerColor || (PlayerColor = {}));
// enum PieceRole {
//     'jiang',
//     'shi',
//     'xiang',
//     'ju',
//     'ma',
//     'pao',
//     // problematic, why not just use soilder
//     'zu',
//     'bing'
// }
var PieceRole;
(function (PieceRole) {
    PieceRole[PieceRole["General"] = 0] = "General";
    PieceRole[PieceRole["Advisor"] = 1] = "Advisor";
    PieceRole[PieceRole["Elephant"] = 2] = "Elephant";
    PieceRole[PieceRole["Chariot"] = 3] = "Chariot";
    PieceRole[PieceRole["Horse"] = 4] = "Horse";
    PieceRole[PieceRole["Cannon"] = 5] = "Cannon";
    PieceRole[PieceRole["Soldier"] = 6] = "Soldier";
})(PieceRole || (PieceRole = {}));
// The vertical lines are known as files (Chinese: 路; pinyin: lù; "road")
// the horizontal lines are known as ranks 线 xiàn; "line"
var Point = /** @class */ (function () {
    function Point(file, rank) {
        this.y_coor = rank; //rank -> horizontal
        this.x_coor = file; //file -> verticle
    }
    return Point;
}());
var intersections;
var Board = /** @class */ (function () {
    function Board() {
        this.ratio = 100; //default ratio 100%
        this.side_length = this.ratio * 0.01 * SIDE_LENGTH;
        //A.K.A points.
        this.intersections = new Array();
        for (var i = 0; i < 9; i++) {
            this.intersections[i] = [];
            for (var j = 0; j < 10; j++) {
                // 1 2 3 4 5 6 7 8 9
                // 2
                // 3
                // 4
                // 5
                // 6
                // 7
                // 8
                // 9
                // 10
                this.intersections[i][j] = (new Point(i + 1, j + 1));
            }
        }
    }
    Board.prototype.detectZoom = function () {
        var ratio = 0;
        // screen = window.screen,
        // ua = navigator.userAgent.toLowerCase();
        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        }
        // ???? not working, why?
        // else if (~ua.indexOf('msie')) {
        //     if (screen.deviceXDPI && screen.logicalXDPI) {
        //         ratio = screen.deviceXDPI / screen.logicalXDPI;
        //     }
        // }
        else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
        }
        if (ratio) {
            ratio = Math.round(ratio * 100);
        }
        return ratio;
    };
    return Board;
}());
var Piece = /** @class */ (function () {
    function Piece(piece_role, board, x_coor, y_coor, img_filepath, color, element) {
        this.board = board;
        this.piece_role = piece_role;
        this.selected = false;
        this.active = false;
        this.img_filepath = img_filepath;
        this.color = color;
        this.x_coor = x_coor;
        this.y_coor = y_coor;
        this.element = element;
        // this.cell = this.board.get_cell(x_coor, y_coor);
        // this.cell.set_piece(this);
    }
    return Piece;
}());
var General = /** @class */ (function (_super) {
    __extends(General, _super);
    function General(board, x_coor, y_coor, img_filepath, color, element) {
        var _this = _super.call(this, PieceRole.General, board, x_coor, y_coor, img_filepath, color, element) || this;
        if (_this.color == PieceColor.red) {
            _this.img_filepath = './img/pieces/red-shuai.png';
            // this.x_coor = ;
        }
        else if (_this.color == PieceColor.black) {
            _this.img_filepath = './img/pieces/black-jiang.png';
        }
        else {
            console.log('Something wrong');
        }
        return _this;
    }
    return General;
}(Piece));
var Player = /** @class */ (function () {
    function Player() {
    }
    return Player;
}());
var board = new Board();
board.intersections;
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 10; j++) {
        console.log("xcoor: " + board.intersections[i][j].x_coor + " \n                     ycoor: " + board.intersections[i][j].y_coor);
    }
}
