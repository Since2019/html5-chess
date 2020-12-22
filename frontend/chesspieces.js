// import Log from "../src/Util";
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
var SIDE_LENGTH = 80;
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
    function Point(col, row) {
        this.x_coor = col; //file -> verticle
        this.y_coor = row; //rank -> horizontal
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
        this.render();
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
        this.ratio = ratio;
        console.log('ratio');
        console.log(ratio);
        console.log(this.ratio);
    };
    Board.prototype.render = function () {
        this.image = document.createElement("img");
        this.image.src = './img/antontw_chinese_chess_plate.svg';
        this.image.id = 'id_chessboard';
        $('#board').append(this.image);
        $("#id_chessboard").css("position", "fixed");
    };
    return Board;
}());
var Piece = /** @class */ (function () {
    function Piece(piece_role, board, point, img_filepath, color, element) {
        this.board = board;
        this.piece_role = piece_role;
        this.selected = false;
        this.active = false;
        this.img_filepath = img_filepath;
        this.color = color;
        this.point = point;
        this.element = element;
        // this.cell = this.board.get_cell(x_coor, y_coor);
        // this.cell.set_piece(this);
        this.ratio = 100; //default ratio 100%
        this.side_length = this.ratio * 0.01 * SIDE_LENGTH;
        // this.render(); //render the stuff
    }
    Piece.prototype.render = function () {
        // can't use Jquery?
        // var image = $(`<img src='${this.img_filepath}' />`)
        var _a;
        var image = document.createElement("img");
        image.src = this.img_filepath;
        image.className = 'classname_pieces';
        image.id = 'general';
        console.log(this.img_filepath);
        console.log('192');
        console.log(this.point);
        var x_coor;
        var y_coor;
        if (this.point) {
            x_coor = this.point.x_coor;
            y_coor = this.point.y_coor;
            var left = (x_coor * this.side_length);
            var top_1 = (y_coor * this.side_length);
            // this.element.append(image);
            console.log("this.point");
            console.log(this.point);
            $(image).css('left', left);
            $(image).css('top', top_1);
            $(image).css('height', this.side_length);
            $(image).css('width', this.side_length);
            (_a = document.getElementById("board")) === null || _a === void 0 ? void 0 : _a.append(image);
            console.log('x_coor');
            console.log(x_coor);
            console.log('y_coor');
            console.log(y_coor);
            console.log(y_coor * SIDE_LENGTH);
            console.log((y_coor * SIDE_LENGTH).toString());
            console.log($(this.element));
            console.log(this.element);
            var ele_style = { 'left': left, 'top': top_1 };
            console.log(ele_style);
            console.log((x_coor * SIDE_LENGTH).toString());
        }
    };
    return Piece;
}());
var General = /** @class */ (function (_super) {
    __extends(General, _super);
    function General(board, point, img_filepath, color, element) {
        var _this = _super.call(this, PieceRole.General, board, point, img_filepath, color, element) || this;
        if (_this.color == PieceColor.red) {
            _this.img_filepath = './img/pieces/red-shuai.png';
            _this.point = _this.board.intersections[4][9];
            console.log("General Point");
            console.log(_this.point);
        }
        else if (_this.color == PieceColor.black) {
            _this.img_filepath = './img/pieces/black-jiang.png';
            _this.point = _this.board.intersections[4][0];
            console.log("General Point");
            console.log(_this.point);
        }
        else {
            console.log('Something is wrong');
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
var div = document.createElement("div");
var black_jiang = new General(board, new Point(0, 4), './img/pieces/black-jiang.png', PieceColor.black, div);
var red_shuai = new General(board, new Point(9, 4), './img/pieces/red-shuai.png', PieceColor.red, div);
black_jiang.render();
red_shuai.render();
$(".classname_pieces").css("position", "absolute");
$(".classname_pieces").css("background", "red");
console.log("resize");
$(window).resize(function () {
    if (screen.width == window.innerWidth) {
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
        console.log('ratio');
        console.log(ratio);
    }
    else if (screen.width > window.innerWidth) {
        console.log("you have zoomed in the page i.e more than 100%");
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
        console.log('ratio');
        console.log(ratio);
    }
    else {
        console.log("you have zoomed out i.e less than 100%");
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
        console.log('ratio');
        console.log(ratio);
    }
});
