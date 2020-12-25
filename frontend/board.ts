import { getZoomedRatio, Point, SIDE_LENGTH } from "./frontend-utils";


class Board {
    // xCoor:Number
    // this.xCoor = xCoor;   

    intersections: Array<Array<any>>;
    div_2d_array: Array<Array<any>>;


    //how to get ratio : https://www.jianshu.com/p/6db40c482899
    ratio: number;
    side_length: number;

    image?: HTMLImageElement;

    constructor() {

        this.ratio = 100; //default ratio 100%
        this.side_length = this.ratio * 0.01 * SIDE_LENGTH;

        //A.K.A points.
        this.intersections = new Array<Array<any>>();
        this.div_2d_array = new Array<Array<any>>();

        for (let i = 0; i < 9; i++) {
            this.intersections[i] = [];
            this.div_2d_array[i] = [];
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

                let grid_div = document.createElement('div');

                grid_div.id = `grid_div_${i + 1}_${j + 1}`;
                grid_div.className = 'className_grid_div'

                $(grid_div).css('grid-column', i + 1);
                $(grid_div).css('grid-row', j + 1);

                this.div_2d_array[i][j] = grid_div;

                $('#board').append(this.div_2d_array[i][j]);



            }
        }
    }

    detectZoom() {
        let ratio = 0;
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

        // this.image = document.createElement("img");
        // this.image.src = './img/antontw_chinese_chess_plate.svg';
        // this.image.id = 'id_chessboard';

        let board = $('#board');

        // $(board).append(this.image);
        $(board).css('height', 'fit-content');

        $("#id_chessboard").css("position", "fixed");
        $("#id_chessboard").css("max-height", '100vh');

        // $("#board").css("left", "0px");
        $("#id_chessboard").css("margin", "0");
        $("#id_chessboard").css("padding", "0vw");

        // let board_width = $("#board").css('width')
        // let board_height = $("#board").css('height')
        // alert(board_height);
        // alert((parseInt(board_width) - parseInt(board_height))/2)
        // $("#board").css("width", $("#board").css('height'));

        $("#board").css('margin-left', 'auto');
        $("#board").css('margin-right', 'auto');
        

        // let offset = 50
        // $.when(()=>{
        //     $("#board").css('margin-left', 'auto');
        //     $("#board").css('margin-right', 'auto');
        // })
        // .then(()=>{
        //     $("#board").css('margin-left',  parseInt($("#board").css('margin-left'))-offset);
        //     $("#board").css('margin-right', parseInt($("#board").css('margin-right'))-offset);
        // })



        $("#board").css('padding', 0);

        // testing
        $('.className_grid_div').css('background-color', 'rgba(255,0,0,0.3)')



        $(window).resize(function () {
            let board = $('#board')

            $.when()
                .then(() => {

                    board.css('width', board.css('height'))
                    board.css('height', board.css('width'))

                })
                .then(() => {
                    $('.className_grid_div').css('width', parseInt(board.css('width')) / 11)
                    $('.className_grid_div').css('height', parseInt(board.css('height')) / 10)
                    $('.className_grid_div').css('z-index', 10)
                    $('.className_grid_div').css('margin', 0)
                })
                .then(()=>{
                    $('.pieces').css('width', parseInt($('.className_grid_div').css('width'))/2)
                    $('.pieces').css('height',parseInt($('.className_grid_div').css('width'))/2)
                })
                .then(()=>{
                    board.css('max-width', board.css('height'))
                })

         


        });




        $("#board").css("max-width", "100vh");
    }
}


export {
    Board
}