(()=>{"use strict";var e={233:(e,o,t)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.Piece=void 0;var i,s,r,n=t(788);!function(e){e[e.black=0]="black",e[e.red=1]="red"}(i||(i={})),function(e){e[e.black=0]="black",e[e.red=1]="red"}(s||(s={})),function(e){e[e.General=0]="General",e[e.Advisor=1]="Advisor",e[e.Elephant=2]="Elephant",e[e.Chariot=3]="Chariot",e[e.Horse=4]="Horse",e[e.Cannon=5]="Cannon",e[e.Soldier=6]="Soldier"}(r||(r={}));var a=function(){function e(e,o){this.point=e,this.selected=!1,this.active=!1,this.ratio=100,this.side_length=.01*this.ratio*n.SIDE_LENGTH,this.board=o,this.elem=document.createElement("img")}return e.prototype.render=function(){this.elem.className="pieces",$(window).resize(e.adjustResize)},e.adjustResize=function(){screen.width==window.innerWidth?(console.log("at exact 100%"),n.getChessBoardSize(),$(".className_grid_div").css("width",n.SIDE_LENGTH*(n.getZoomedRatio()/100)),$(".className_grid_div").css("height",n.SIDE_LENGTH*(n.getZoomedRatio()/100)),$(".pieces").css("width",n.SIDE_LENGTH*(n.getZoomedRatio()/100)),$(".pieces").css("height",n.SIDE_LENGTH*(n.getZoomedRatio()/100)),$("#board").css("width",$("#board").css("height")),$("#id_chessboard").css("width",$("#board").css("width"))):screen.width>window.innerWidth?(console.log("you have zoomed in the page i.e more than 100%"),n.getZoomedRatio(),n.getChessBoardSize(),$(".className_grid_div").css("width",n.SIDE_LENGTH*(n.getZoomedRatio()/100)),$(".className_grid_div").css("height",n.SIDE_LENGTH*(n.getZoomedRatio()/100)),$(".pieces").css("width",n.SIDE_LENGTH*(n.getZoomedRatio()/100)),$(".pieces").css("height",n.SIDE_LENGTH*(n.getZoomedRatio()/100)),$("#board").css("width",$("#board").css("height")),$("#id_chessboard").css("width",$("#board").css("width"))):(console.log("you have zoomed out i.e less than 100%"),n.getZoomedRatio(),n.getChessBoardSize(),$(".className_grid_div").css("width"),$(".className_grid_div").css("width",n.SIDE_LENGTH*(n.getZoomedRatio()/100)),$(".className_grid_div").css("height",n.SIDE_LENGTH*(n.getZoomedRatio()/100)),$(".pieces").css("width",n.SIDE_LENGTH*(n.getZoomedRatio()/100)),$(".pieces").css("height",n.SIDE_LENGTH*(n.getZoomedRatio()/100)),$("#board").css("width",$("#board").css("height")),$("#id_chessboard").css("width",$("#board").css("width")))},e}();o.Piece=a},862:(e,o,t)=>{var i=t(598),s=t(788),r=t(299);(new(function(){function e(){this.board=new i.Board}return e.prototype.render=function(){this.board.render(),new r.RedGeneral(this.board,new s.Point(4,9)).render(),new r.BlackGeneral(this.board,new s.Point(4,0)).render()},e}())).render()},299:function(e,o,t){var i,s=this&&this.__extends||(i=function(e,o){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(e[t]=o[t])})(e,o)},function(e,o){function t(){this.constructor=e}i(e,o),e.prototype=null===o?Object.create(o):(t.prototype=o.prototype,new t)});Object.defineProperty(o,"__esModule",{value:!0}),o.BlackGeneral=o.RedGeneral=void 0;var r=function(e){function o(o,t){return e.call(this,o,t)||this}return s(o,e),o}(t(233).Piece),n=function(e){function o(o,t){var i=e.call(this,t,o)||this;return i.elem.src="./img/pieces/red-shuai.png",i}return s(o,e),o.prototype.render=function(){console.log("this.point.x_coor"),console.log(this.point.x_coor),console.log("this.point.y_coor"),console.log(this.point.y_coor),$(this.board.div_2d_array[this.point.x_coor][this.point.y_coor]).append(this.elem)},o}(r);o.RedGeneral=n;var a=function(e){function o(o,t){var i=e.call(this,t,o)||this;return i.elem.src="./img/pieces/black-jiang.png",i}return s(o,e),o.prototype.render=function(){console.log("this.point.x_coor"),console.log(this.point.x_coor),console.log("this.point.y_coor"),console.log(this.point.y_coor),$(this.board.div_2d_array[this.point.x_coor][this.point.y_coor]).append(this.elem)},o}(r);o.BlackGeneral=a},598:(e,o,t)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.Board=void 0;var i=t(788),s=function(){function e(){this.ratio=100,this.side_length=.01*this.ratio*i.SIDE_LENGTH,this.intersections=new Array,this.div_2d_array=new Array;for(var e=0;e<9;e++){this.intersections[e]=[],this.div_2d_array[e]=[];for(var o=0;o<10;o++){this.intersections[e][o]=new i.Point(e+1,o+1);var t=document.createElement("div");t.id="grid_div_"+(e+1)+"_"+(o+1),t.className="className_grid_div",$(t).css("grid-column",e+1),$(t).css("grid-row",o+1),this.div_2d_array[e][o]=t,$("#board").append(this.div_2d_array[e][o])}}}return e.prototype.detectZoom=function(){var e=0;void 0!==window.devicePixelRatio?e=window.devicePixelRatio:void 0!==window.outerWidth&&void 0!==window.innerWidth&&(e=window.outerWidth/window.innerWidth),e&&(e=Math.round(100*e)),this.ratio=e,console.log("ratio"),console.log(e),console.log(this.ratio)},e.prototype.render=function(){var e=$("#board");$(e).css("height","fit-content"),$("#id_chessboard").css("position","fixed"),$("#id_chessboard").css("max-height","100vh"),$("#id_chessboard").css("margin","0"),$("#id_chessboard").css("padding","0vw"),$("#board").css("margin-left","auto"),$("#board").css("margin-right","auto"),$("#board").css("padding",0),$(".className_grid_div").css("background-color","rgba(255,0,0,0.3)"),$(window).resize((function(){var e=$("#board");$.when().then((function(){e.css("width",e.css("height")),e.css("height",e.css("width"))})).then((function(){$(".className_grid_div").css("width",parseInt(e.css("width"))/11),$(".className_grid_div").css("height",parseInt(e.css("height"))/10),$(".className_grid_div").css("z-index",10),$(".className_grid_div").css("margin",0)})).then((function(){$(".pieces").css("width",parseInt($(".className_grid_div").css("width"))/2),$(".pieces").css("height",parseInt($(".className_grid_div").css("width"))/2)})).then((function(){e.css("max-width",e.css("height"))}))})),$("#board").css("max-width","100vh")},e}();o.Board=s},788:function(e,o,t){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(o,"__esModule",{value:!0}),o.SIDE_LENGTH_vw=o.SIDE_LENGTH=o.Point=o.getChessBoardSize=o.getZoomedRatio=void 0;var s=i(t(102));function r(){var e=0;return void 0!==window.devicePixelRatio?e=window.devicePixelRatio:void 0!==window.outerWidth&&void 0!==window.innerWidth&&(e=window.outerWidth/window.innerWidth),e&&(e=Math.round(100*e)),e}o.getZoomedRatio=r,o.getChessBoardSize=function(){s.default.trace("chessboard size:");var e=$("#id_chessboard");s.default.trace("chessboad width"),s.default.trace(e.css("width")),s.default.trace("chessboad height"),s.default.trace(e.css("height"))};o.Point=function(e,o){this.x_coor=e,this.y_coor=o},o.SIDE_LENGTH=75;var n=70/(.01*r());o.SIDE_LENGTH_vw=n},102:function(e,o){var t=this&&this.__spreadArrays||function(){for(var e=0,o=0,t=arguments.length;o<t;o++)e+=arguments[o].length;var i=Array(e),s=0;for(o=0;o<t;o++)for(var r=arguments[o],n=0,a=r.length;n<a;n++,s++)i[s]=r[n];return i};Object.defineProperty(o,"__esModule",{value:!0});var i=function(){function e(){}return e.trace=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];console.log.apply(console,t(["<T> "+(new Date).toLocaleString()+":"],e))},e.info=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];console.info.apply(console,t(["<I> "+(new Date).toLocaleString()+":"],e))},e.warn=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];console.warn.apply(console,t(["<W> "+(new Date).toLocaleString()+":"],e))},e.error=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];console.error.apply(console,t(["<E> "+(new Date).toLocaleString()+":"],e))},e.test=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];console.log.apply(console,t(["<X> "+(new Date).toLocaleString()+":"],e))},e}();o.default=i}},o={};!function t(i){if(o[i])return o[i].exports;var s=o[i]={exports:{}};return e[i].call(s.exports,s,s.exports,t),s.exports}(862)})();