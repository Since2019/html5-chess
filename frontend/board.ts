// // import  {Piece} from './chesspieces'
// // import  {Point} from './chesspieces'
// /// <reference path = "./chesspieces.ts" />


// //how many px when it's zoomed 100%
// const SIDE_LENGTH: number = 5;
// class Board {
//     // xCoor:Number
//     // this.xCoor = xCoor;   

//     intersections: Array<Array<any>>;

//     image? : HTMLImageElement;
   

//     //how to get ratio : https://www.jianshu.com/p/6db40c482899
//     ratio: number;
//     side_length: number;


//     constructor() {
        
//         this.ratio = 100; //default ratio 100%
//         this.side_length = this.ratio * 0.01 * SIDE_LENGTH; 

//         //A.K.A points.
//         this.intersections = new Array<Array<any>>();

//         for  ( let i = 0; i < 9; i++ ) {
//             this.intersections[i] = [];
//             for(let j = 0; j < 10; j++){
              
//                 // 1 2 3 4 5 6 7 8 9
//                 // 2
//                 // 3
//                 // 4
//                 // 5

//                 // 6
//                 // 7
//                 // 8
//                 // 9
//                 // 10
//                 this.intersections[i][j] = (new Point(i+1,j+1));
//             }
//       }
//     }

//     detectZoom() {
//         var ratio = 0;
//         // screen = window.screen,
//         // ua = navigator.userAgent.toLowerCase();
//         if (window.devicePixelRatio !== undefined) {
//             ratio = window.devicePixelRatio;
//         }

//         // ???? not working, why?

//         // else if (~ua.indexOf('msie')) {
//         //     if (screen.deviceXDPI && screen.logicalXDPI) {
//         //         ratio = screen.deviceXDPI / screen.logicalXDPI;
//         //     }
//         // }
//         else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
//             ratio = window.outerWidth / window.innerWidth;
//         }
//         if (ratio) {
//             ratio = Math.round(ratio * 100); 
//         }
//         return ratio;
//     }

//     render(){
//         this.image = document.createElement("img");
//         $('#board').append(this.image);
//     }



// }