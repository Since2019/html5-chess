
//how many px when it's zoomed 100%
const SIDE_LENGTH: number = 5;


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



    constructor(file: number, rank: number) {
        this.y_coor = rank; //rank -> horizontal
        this.x_coor = file; //file -> verticle

    }
}

var intersections:Point[][];

class Board {
    // xCoor:Number
    // this.xCoor = xCoor;   

    intersections: Array<Array<any>>;

   

    //how to get ratio : https://www.jianshu.com/p/6db40c482899
    ratio: number;
    side_length: number;


    constructor() {
        
        this.ratio = 100; //default ratio 100%
        this.side_length = this.ratio * 0.01 * SIDE_LENGTH; 

        //A.K.A points.
        this.intersections = new Array<Array<any>>();

        for  ( let i = 0; i < 9; i++ ) {
            this.intersections[i] = [];
            for(let j = 0; j < 10; j++){
              
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
                this.intersections[i][j] = (new Point(i+1,j+1));
            }
      }
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
        return ratio;
    }

    render(){
        
    }



}




class Piece {
    board: Board;
    piece_role: PieceRole;
    selected: boolean;
    active: boolean;
    img_filepath: string;


    point : Point;

    color: PieceColor;
    element: HTMLElement;

    constructor(piece_role: PieceRole, board: Board , point : Point,
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

        let render = this.render(); //render the stuff
    }

    render(){   

        // can't use Jquery?
        // var image = $(`<img src='${this.img_filepath}' />`)

        var image = document.createElement("img");
        image.src = this.img_filepath;
    
        
        console.log(this.img_filepath)
        var x_coor = this.point.x_coor;
        var y_coor = this.point.y_coor;

        let left = (x_coor * SIDE_LENGTH).toString();
        let top = (y_coor * SIDE_LENGTH).toString();

        this.element.append(image);

        document.getElementById("board")?.append(this.element)
        this.element.id = 'test_rendering'

        console.log(`this.point`)
        console.log(this.point)


        // $(this.element).css('left',(x_coor * SIDE_LENGTH).toString())
        // $(this.element).css('top',(x_coor * SIDE_LENGTH).toString())

        
        $(this.element).css('left',left);
        $(this.element).css('top',top);

        console.log(y_coor)
        console.log(y_coor * SIDE_LENGTH)
        console.log((y_coor * SIDE_LENGTH).toString())
        console.log( $(this.element))
        console.log(this.element)
       

        let ele_style = {'left' : left, 'top' : top}
        console.log(ele_style);
        // (<any>Object).assign(this.element.style, ele_style)


        this.element.setAttribute("style",`left: ${(x_coor * SIDE_LENGTH).toString()}px;`);
        // this.element.setAttribute("style",`top: ${(y_coor * SIDE_LENGTH).toString()}px;`);

        // this.element.style.top =  (y_coor * SIDE_LENGTH).toString();

       
        console.log(this.element)
        console.log((x_coor * SIDE_LENGTH).toString())
    }

}



class General extends Piece {

    constructor(board: Board, point : Point, img_filepath: string, color: PieceColor, element : HTMLElement) {
        super(PieceRole.General, board, point, img_filepath, color, element);

        if (this.color == PieceColor.red) {
            this.img_filepath = './img/pieces/red-shuai.png';
            this.point = this.board.intersections[4][9];
            console.log("General Point")
            console.log(this.point)
        }
        else if(this.color == PieceColor.black){
            this.img_filepath = './img/pieces/black-jiang.png';
            this.point = this.board.intersections[4][0];
            console.log("General Point")
            console.log(this.point)
        }
        else{
            console.log('Something is wrong');
        }


    }


}



class Player {

}


var board = new Board();
board.intersections;
for(let i = 0; i < 9; i++){
    for(let j = 0 ; j < 10; j ++){
        console.log(`xcoor: ${board.intersections[i][j].x_coor} 
                     ycoor: ${board.intersections[i][j].y_coor}`)
       
    }
}

var div = document.createElement("div");
var black_jiang = new General(board,new Point(0,4),'./img/pieces/black-jiang.png',PieceColor.black,div)
var red_shuai = new General(board,new Point(9,4),'./img/pieces/red-shuai.png',PieceColor.red,div)

