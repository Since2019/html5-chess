// import Log from "../src/Util";

//how many px when it's zoomed 100%
const SIDE_LENGTH: number = 80;


// used in class Piece
enum PieceColor {
    'black',
    'red'
}

// used in class Game, 
enum PlayerColor {
    'black',
    'red'
}

enum PieceRole {
    'General',
    'Advisor',
    'Elephant',
    'Chariot',
    'Horse',
    'Cannon',
    'Soldier'

}

// The vertical lines are known as files (Chinese: 路; pinyin: lù; "road")
// the horizontal lines are known as ranks 线 xiàn; "line"
class Point {
    x_coor: number;
    y_coor: number;



    constructor(col: number, row: number) {

        this.x_coor = col; //file -> verticle
        this.y_coor = row; //rank -> horizontal
    }
}

var intersections: Point[][];

class Board {
    // xCoor:Number
    // this.xCoor = xCoor;   

    intersections: Array<Array<any>>;



    //how to get ratio : https://www.jianshu.com/p/6db40c482899
    ratio: number;
    side_length: number;

    image?: HTMLImageElement;

    constructor() {

        this.ratio = 100; //default ratio 100%
        this.side_length = this.ratio * 0.01 * SIDE_LENGTH;

        //A.K.A points.
        this.intersections = new Array<Array<any>>();

        for (let i = 0; i < 9; i++) {
            this.intersections[i] = [];
            for (let j = 0; j < 10; j++) {

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

    detectZoom() {
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
        console.log('ratio')
        console.log(ratio)
        console.log(this.ratio)


    }

    render() {
        this.image = document.createElement("img");
        this.image.src = './img/antontw_chinese_chess_plate.svg';
        this.image.id = 'id_chessboard';

        $('#board').append(this.image);
        $("#id_chessboard").css("position", "fixed");


    }



}




class Piece {
    board: Board;
    piece_role: PieceRole;
    selected: boolean;
    active: boolean;
    img_filepath: string;
    side_length: number;
    ratio: number;

    point?: Point;

    color: PieceColor;
    element: HTMLElement;



    constructor(piece_role: PieceRole, board: Board,point:Point,
        img_filepath: string, color: PieceColor, element: HTMLElement) {

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

    render() {

        // can't use Jquery?
        // var image = $(`<img src='${this.img_filepath}' />`)

        var image = document.createElement("img");
        image.src = this.img_filepath;

        image.className = 'classname_pieces'
        image.id = 'general'


        console.log(this.img_filepath)
        console.log('192')
        console.log(this.point)

        var x_coor
        var y_coor
        if (this.point) {
            x_coor = this.point.x_coor;
            y_coor = this.point.y_coor;

            let left = (x_coor * this.side_length)
            let top = (y_coor * this.side_length)

            // this.element.append(image);




            console.log(`this.point`)
            console.log(this.point)


            $(image).css('left', left)
            $(image).css('top', top)
            $(image).css('height', this.side_length)
            $(image).css('width', this.side_length)

            document.getElementById("board")?.append(image)


            console.log('x_coor')
            console.log(x_coor)
            console.log('y_coor')
            console.log(y_coor)
            console.log(y_coor * SIDE_LENGTH)
            console.log((y_coor * SIDE_LENGTH).toString())
            console.log($(this.element))
            console.log(this.element)


            let ele_style = { 'left': left, 'top': top }
            console.log(ele_style);

            console.log((x_coor * SIDE_LENGTH).toString())
        }




    }

}



class General extends Piece {

    constructor(board: Board, point: Point, img_filepath: string, color: PieceColor, element: HTMLElement) {
        super(PieceRole.General, board,point, img_filepath, color, element);

        if (this.color == PieceColor.red) {
            this.img_filepath = './img/pieces/red-shuai.png';
            this.point = this.board.intersections[4][9];
            console.log("General Point")
            console.log(this.point)
        }
        else if (this.color == PieceColor.black) {
            this.img_filepath = './img/pieces/black-jiang.png';
            this.point = this.board.intersections[4][0];
            console.log("General Point")
            console.log(this.point)
        }
        else {
            console.log('Something is wrong');
        }


    }


}



class Player {

}


let board = new Board();


board.intersections;
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 10; j++) {
        console.log(`xcoor: ${board.intersections[i][j].x_coor} 
                     ycoor: ${board.intersections[i][j].y_coor}`)
    }
}


let div = document.createElement("div");
let black_jiang = new General(board, new Point(0, 4), './img/pieces/black-jiang.png', PieceColor.black, div)
let red_shuai = new General(board, new Point(9, 4), './img/pieces/red-shuai.png', PieceColor.red, div)

black_jiang.render();
red_shuai.render();

$(".classname_pieces").css("position", "absolute");
$(".classname_pieces").css("background", "red");

console.log("resize")
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

        console.log('ratio')
        console.log(ratio)

    } else if (screen.width > window.innerWidth) {
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

        console.log('ratio')
        console.log(ratio)


    } else {
        console.log("you have zoomed out i.e less than 100%")

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

        console.log('ratio')
        console.log(ratio)
    }
});