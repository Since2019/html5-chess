(()=>{"use strict";var e={718:(e,o,t)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.Board=void 0;var i=t(950),r=function(){function e(){this.ratio=100,this.side_length=.01*this.ratio*i.SIDE_LENGTH,this.intersections=new Array;for(var e=0;e<9;e++){this.intersections[e]=[];for(var o=0;o<10;o++)this.intersections[e][o]=new i.Point(e+1,o+1)}}return e.prototype.movePieceFromSrcToDest=function(e,o,t){o.setPiece(null),e.moveToPoint(t),t.setPiece(e)},e.prototype.getPointFromCoordinates=function(e,o){return this.validateXCoordinate(e)&&this.validateYCoordinate(o)?this.intersections[e-1][o-1]:null},e.prototype.validateXCoordinate=function(e){return e>=1&&e<=9},e.prototype.validateYCoordinate=function(e){return e>=1&&e<=10},e.prototype.getRowFromYCoordinate=function(e){for(var o=[],t=0;t<9;t++)o.push(this.intersections[t][e-1]);return o},e.prototype.getColFromXCoordinate=function(e){for(var o=[],t=0;t<10;t++)o.push(this.intersections[e-1][t]);return o},e.prototype.detectZoom=function(){var e=0;void 0!==window.devicePixelRatio?e=window.devicePixelRatio:void 0!==window.outerWidth&&void 0!==window.innerWidth&&(e=window.outerWidth/window.innerWidth),e&&(e=Math.round(100*e)),this.ratio=e},e.prototype.render=function(){var e=$("#board");$("#id_chessboard").css("position","fixed"),$("#id_chessboard").css("max-height","100vh"),$("#id_chessboard").css("margin","0"),$("#id_chessboard").css("padding","0vw"),e.css("margin-left","auto"),e.css("margin-right","auto"),e.css("padding",0),$(".className_grid_div").css("background-color","rgba(255,0,0,0.3)"),$(window).on("resize",(function(){i.fitSize()})),$(document).on("ready",(function(){i.fitSize()})),$("#board").css("max-width","100vh")},e}();o.Board=r},884:function(e,o,t){var i,r=this&&this.__extends||(i=function(e,o){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(e[t]=o[t])})(e,o)},function(e,o){function t(){this.constructor=e}i(e,o),e.prototype=null===o?Object.create(o):(t.prototype=o.prototype,new t)}),n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(o,"__esModule",{value:!0}),o.BlackChariot=o.RedChariot=void 0;var s=n(t(102)),c=t(476),a=function(e){function o(o,t,i){return e.call(this,o,t,c.PieceRole.General,i)||this}return r(o,e),o.prototype.canMove=function(o){var t=o.x_coor,i=o.y_coor;return!(!this.isValidChariotPosition(t,i)||Math.abs(t-this.point.x_coor)>1||Math.abs(i-this.point.y_coor)>1||e.prototype.checkSameColorPieceInPoint.call(this,o))},o}(c.Piece),d=function(e){function o(o,t){var i=e.call(this,t,o,c.PieceColor.RED)||this;return i.elem.src="../img/pieces/red-ju.png",i.board=o,i.point.setPiece(i),$(i.elem).on("click",(function(){i.movablePoints()})),i}return r(o,e),o.prototype.movablePoints=function(){var e=[];return(e=e.concat(this.checkRow())).concat(this.checkColumn())},o.prototype.checkColumn=function(){s.default.trace("in checkColumns");var e=this.point.y_coor,o=(this.point.x_coor,this.board.getColFromXCoordinate(this.point.x_coor)),t=(this.board.getRowFromYCoordinate(this.point.y_coor),0),i=9;for(var r in o)if(null!=o[r].piece)if(parseInt(r)<e-1)(t=o[r].piece.color==c.PieceColor.RED?parseInt(r)+1:parseInt(r))===e-1&&(t=e);else if(parseInt(r)>e-1){(i=o[r].piece.color==c.PieceColor.RED?parseInt(r)-1:parseInt(r))===e-1&&(i=e-2);break}for(var n=[],a=t;a<=i;a++)e-1!==a&&n.push(o[a]);return n},o.prototype.checkRow=function(){s.default.trace("in checkRows()");var e=this.point.x_coor,o=this.board.getRowFromYCoordinate(this.point.y_coor),t=0,i=8;for(var r in o)if(null!=o[r].piece)if(parseInt(r)<e-1)(t=o[r].piece.color==c.PieceColor.RED?parseInt(r)+1:parseInt(r))===e-1&&(t=e),s.default.trace("start_flag:"+t);else if(parseInt(r)>e-1){(i=o[r].piece.color==c.PieceColor.RED?parseInt(r)-1:parseInt(r))===e-1&&(i=e-2),s.default.trace("end_flag:"+i);break}for(var n=[],a=t;a<=i;a++)e-1!==a&&n.push(o[a]);return n},o.prototype.isValidChariotPosition=function(e,o){return o>=8&&o<=10&&e>=4&&e<=6&&!(e>0&&o>0)},o}(a);o.RedChariot=d;var l=function(e){function o(o,t){var i=e.call(this,t,o,c.PieceColor.BLACK)||this;return i.elem.src="../img/pieces/black-ju.png",i.board=o,i.point.setPiece(i),i}return r(o,e),o.prototype.movablePoints=function(){var e=[];return(e=e.concat(this.checkRow())).concat(this.checkColumn())},o.prototype.checkColumn=function(){s.default.trace("in checkColumns");var e=this.point.y_coor,o=(this.point.x_coor,this.board.getColFromXCoordinate(this.point.x_coor)),t=(this.board.getRowFromYCoordinate(this.point.y_coor),0),i=9;for(var r in o)if(null!=o[r].piece)if(parseInt(r)<e-1)(t=o[r].piece.color==c.PieceColor.BLACK?parseInt(r)+1:parseInt(r))===e-1&&(t=e);else if(parseInt(r)>e-1){(i=o[r].piece.color==c.PieceColor.BLACK?parseInt(r)-1:parseInt(r))===e-1&&(i=e-2);break}for(var n=[],a=t;a<=i;a++)e-1!==a&&n.push(o[a]);return console.log(n),n},o.prototype.checkRow=function(){s.default.trace("in checkRows()");var e=this.point.x_coor,o=this.board.getRowFromYCoordinate(this.point.y_coor),t=0,i=8;for(var r in o)if(null!=o[r].piece)if(parseInt(r)<e-1)(t=o[r].piece.isFriendly()?parseInt(r)+1:parseInt(r))===e-1&&(t=e),s.default.trace("start_flag:"+t);else if(parseInt(r)>e-1){(i=o[r].piece.isFriendly()?parseInt(r)-1:parseInt(r))===e-1&&(i=e-2),s.default.trace("end_flag:"+i);break}for(var n=[],c=t;c<=i;c++)e-1!==c&&n.push(o[c]);return console.log(n),n},o.prototype.isValidChariotPosition=function(e,o){return o>=0&&o<=10&&e>=0&&e<=9&&!(e>0&&o>0)},o}(a);o.BlackChariot=l},476:function(e,o,t){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(o,"__esModule",{value:!0}),o.PieceColor=o.PieceRole=o.Piece=void 0;var r,n,s,c=i(t(102)),a=t(950);!function(e){e[e.BLACK=0]="BLACK",e[e.RED=1]="RED"}(r||(r={})),o.PieceColor=r,function(e){e[e.black=0]="black",e[e.red=1]="red"}(n||(n={})),function(e){e[e.General=0]="General",e[e.Advisor=1]="Advisor",e[e.Elephant=2]="Elephant",e[e.Chariot=3]="Chariot",e[e.Horse=4]="Horse",e[e.Cannon=5]="Cannon",e[e.Soldier=6]="Soldier"}(s||(s={})),o.PieceRole=s;var d=function(){function e(e,o,t,i){this.point=e,this.has_moved=!1,this.active=!1,this.ratio=100,this.side_length=.01*this.ratio*a.SIDE_LENGTH,this.board=o,this.elem=document.createElement("img"),this.piece_role=t,this.color=i,this.state=0,$(window).on("mousedown",(function(e){e.preventDefault()})),$(window).on("change",(function(e){e.preventDefault(),console.log("changed")})),this.listenerManager()}return e.prototype.listenerManager=function(){this.attachSelectPieceListener()},e.prototype.attachSelectPieceListener=function(){var e=this;$(this.elem).on("click",(function(o){o.preventDefault(),$(".className_grid_div").css("background","rgba(3, 181, 252,0.0)");var t=[];t=e.movablePoints(),console.log(t),t.forEach((function(e){$(e.elem).css("background","rgba(3, 181, 252,0.5")})),e.active=!0,e.board.active_piece=e,e.attachMoveToGridListener()}))},e.prototype.attachMoveToGridListener=function(){var e=this;$(".className_grid_div").on("click",(function(o){e.board.active_piece?(console.log("the piece is selected?"+e.active),console.log("clicked")):(console.log("the piece is selected?"+e.active),console.log("doing nothing"),$(".className_grid_div").css("background","rgba(0,0,0,0.0)")),e.removeMoveToGridListener()}))},e.prototype.removeMoveToGridListener=function(){$(".className_grid_div").on("click",(function(e){console.log("clicked"),$(".className_grid_div").unbind("click"),$(".className_grid_div").css("background","rgba(0,0,0,0.0)")}))},e.prototype.movablePoints=function(){return c.default.trace("movable points of a piece"),[]},e.prototype.getElement=function(){return this.elem},e.prototype.getRole=function(){return this.piece_role},e.prototype.getColor=function(){return this.color},e.prototype.moveToPoint=function(e){this.point=e},e.prototype.checkSameColorPieceInPoint=function(e){var o=e.getPiece();return!!o&&o.getColor()===this.color},e.prototype.isFriendly=function(e){return!!e&&e.getColor()===this.color},e.prototype.isEnemy=function(e){return!!e&&e.getColor()!=this.color},e.prototype.render=function(){this.board.intersections[this.point.x_coor-1][this.point.y_coor-1].elem.append(this.elem),$(this.elem).addClass("pieces"),$(this.elem).addClass(s[this.piece_role].toString()),$(this.elem).addClass(r[this.color].toString())},e.adjustResize=function(){screen.width==window.innerWidth?(console.log("at exact 100%"),a.getChessBoardSize(),$(".className_grid_div").css("width",a.SIDE_LENGTH*(a.getZoomedRatio()/100)),$(".className_grid_div").css("height",a.SIDE_LENGTH*(a.getZoomedRatio()/100)),$(".pieces").css("width",a.SIDE_LENGTH*(a.getZoomedRatio()/100)),$(".pieces").css("height",a.SIDE_LENGTH*(a.getZoomedRatio()/100)),$("#board").css("width",$("#board").css("height")),$("#id_chessboard").css("width",$("#board").css("width"))):screen.width>window.innerWidth?(console.log("you have zoomed in the page i.e more than 100%"),a.getZoomedRatio(),a.getChessBoardSize(),$(".className_grid_div").css("width",a.SIDE_LENGTH*(a.getZoomedRatio()/100)),$(".className_grid_div").css("height",a.SIDE_LENGTH*(a.getZoomedRatio()/100)),$(".pieces").css("width",a.SIDE_LENGTH*(a.getZoomedRatio()/100)),$(".pieces").css("height",a.SIDE_LENGTH*(a.getZoomedRatio()/100)),$("#board").css("width",$("#board").css("height")),$("#id_chessboard").css("width",$("#board").css("width"))):(console.log("you have zoomed out i.e less than 100%"),a.getZoomedRatio(),a.getChessBoardSize(),$(".className_grid_div").css("width"),$(".className_grid_div").css("width",a.SIDE_LENGTH*(a.getZoomedRatio()/100)),$(".className_grid_div").css("height",a.SIDE_LENGTH*(a.getZoomedRatio()/100)),$(".pieces").css("width",a.SIDE_LENGTH*(a.getZoomedRatio()/100)),$(".pieces").css("height",a.SIDE_LENGTH*(a.getZoomedRatio()/100)),$("#board").css("width",$("#board").css("height")),$("#id_chessboard").css("width",$("#board").css("width")))},e}();o.Piece=d},20:(e,o,t)=>{var i=t(718),r=t(884),n=t(950),s=t(360);(new(function(){function e(){this.currentPlayer=n.PlayerColor.red,this.board=new i.Board}return e.prototype.getCurrentPlayer=function(){return this.currentPlayer},e.prototype.alternatePlayer=function(){this.currentPlayer===n.PlayerColor.red?this.currentPlayer=n.PlayerColor.black:this.currentPlayer=n.PlayerColor.red},e.prototype.render=function(){this.board.render(),new s.RedGeneral(this.board,this.board.getPointFromCoordinates(5,10)).render(),new s.BlackGeneral(this.board,this.board.getPointFromCoordinates(5,1)).render();var e=new r.RedChariot(this.board,this.board.getPointFromCoordinates(1,1)),o=new r.RedChariot(this.board,this.board.getPointFromCoordinates(9,1)),t=new r.RedChariot(this.board,this.board.getPointFromCoordinates(9,3)),i=new r.RedChariot(this.board,this.board.getPointFromCoordinates(9,4)),n=new r.BlackChariot(this.board,this.board.getPointFromCoordinates(1,10)),c=new r.BlackChariot(this.board,this.board.getPointFromCoordinates(9,10));e.render(),o.render(),n.render(),c.render(),t.render(),i.render()},e}())).render()},360:function(e,o,t){var i,r=this&&this.__extends||(i=function(e,o){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(e[t]=o[t])})(e,o)},function(e,o){function t(){this.constructor=e}i(e,o),e.prototype=null===o?Object.create(o):(t.prototype=o.prototype,new t)});Object.defineProperty(o,"__esModule",{value:!0}),o.BlackGeneral=o.RedGeneral=void 0;var n=t(476),s=function(e){function o(o,t,i){return e.call(this,o,t,n.PieceRole.General,i)||this}return r(o,e),o.prototype.canMove=function(o){var t=o.x_coor,i=o.y_coor;return!(!this.isValidGeneralPosition(t,i)||Math.abs(t-this.point.x_coor)>1||Math.abs(i-this.point.y_coor)>1||e.prototype.checkSameColorPieceInPoint.call(this,o))},o}(n.Piece),c=function(e){function o(o,t){var i=e.call(this,t,o,n.PieceColor.RED)||this;return i.elem.src="../img/pieces/red-shuai.png",i.board=o,i.point.setPiece(i),i}return r(o,e),o.prototype.checkColumns=function(){var e=this.point.y_coor,o=this.point.x_coor,t=this.board.getPointFromCoordinates(o,e-1);this.board.getPointFromCoordinates(o,e+1),t&&(console.log("front.getPiece()"),console.log(t.getPiece())),console.log(this.board.getColFromXCoordinate(o))},o.prototype.checkRows=function(){var e=this.point.y_coor,o=this.point.x_coor,t=this.board.getPointFromCoordinates(o,e-1);this.board.getPointFromCoordinates(o,e+1),t&&(console.log("front.getPiece()"),console.log(t.getPiece())),console.log(this.board.getColFromXCoordinate(o))},o.prototype.isValidGeneralPosition=function(e,o){return o>=8&&o<=10&&e>=4&&e<=6&&!(e>0&&o>0)},o}(s);o.RedGeneral=c;var a=function(e){function o(o,t){var i=e.call(this,t,o,n.PieceColor.BLACK)||this;return i.elem.src="../img/pieces/black-jiang.png",i.board=o,i.point.setPiece(i),i}return r(o,e),o.prototype.isValidGeneralPosition=function(e,o){return o>=1&&o<=3&&e>=4&&e<=6&&!(e>0&&o>0)},o}(s);o.BlackGeneral=a},950:function(e,o,t){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(o,"__esModule",{value:!0}),o.PlayerColor=o.PieceColor=o.SIDE_LENGTH_vw=o.SIDE_LENGTH=o.Point=o.fitSize=o.getChessBoardSize=o.getZoomedRatio=void 0;var r,n,s=i(t(102));function c(){var e=0;return void 0!==window.devicePixelRatio?e=window.devicePixelRatio:void 0!==window.outerWidth&&void 0!==window.innerWidth&&(e=window.outerWidth/window.innerWidth),e&&(e=Math.round(100*e)),e}!function(e){e[e.black=0]="black",e[e.red=1]="red"}(r||(r={})),o.PieceColor=r,function(e){e[e.black=0]="black",e[e.red=1]="red"}(n||(n={})),o.PlayerColor=n,o.getZoomedRatio=c,o.getChessBoardSize=function(){s.default.trace("chessboard size:");var e=$("#id_chessboard");s.default.trace("chessboad width"),s.default.trace(e.css("width")),s.default.trace("chessboad height"),s.default.trace(e.css("height"))};var a=function(){function e(e,o){this.x_coor=e,this.y_coor=o,this.elem=document.createElement("div"),this.updateElement(e,o)}return e.prototype.setPiece=function(e){this.piece=e},e.prototype.hasPiece=function(){return!!this.piece},e.prototype.getPiece=function(){return this.piece},e.prototype.updateElement=function(e,o){var t=this.elem,i=this.x_coor,r=this.y_coor;t.id="grid_div_"+i+"_"+r,$("#"+t.id).remove(),t.className="className_grid_div",$(t).css("grid-column",e),$(t).css("grid-row",o),$("#board").append(t)},e}();o.Point=a,o.SIDE_LENGTH=75;var d=70/(.01*c());o.SIDE_LENGTH_vw=d,o.fitSize=function(){var e=$("#board");$.when().then((function(){console.log("background-size"),console.log(e.css("background-size")),e.css("width",e.css("height")),e.css("height",e.css("width")),e.css("column-gap","0px"),console.log(e.css("row-gap"))})).then((function(){$(".className_grid_div").css("width",parseInt(e.css("width"))/11),$(".className_grid_div").css("height",parseInt(e.css("height"))/10),$(".className_grid_div").css("z-index",10),$(".className_grid_div").css("margin",0)})).then((function(){$(".pieces").css("width",parseInt($(".className_grid_div").css("width"))),$(".pieces").css("height",parseInt($(".className_grid_div").css("width")))})).then((function(){e.css("max-width",e.css("height"))}))}},102:function(e,o){var t=this&&this.__spreadArrays||function(){for(var e=0,o=0,t=arguments.length;o<t;o++)e+=arguments[o].length;var i=Array(e),r=0;for(o=0;o<t;o++)for(var n=arguments[o],s=0,c=n.length;s<c;s++,r++)i[r]=n[s];return i};Object.defineProperty(o,"__esModule",{value:!0});var i=function(){function e(){}return e.trace=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];console.log.apply(console,t(["<T> "+(new Date).toLocaleString()+":"],e))},e.info=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];console.info.apply(console,t(["<I> "+(new Date).toLocaleString()+":"],e))},e.warn=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];console.warn.apply(console,t(["<W> "+(new Date).toLocaleString()+":"],e))},e.error=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];console.error.apply(console,t(["<E> "+(new Date).toLocaleString()+":"],e))},e.test=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];console.log.apply(console,t(["<X> "+(new Date).toLocaleString()+":"],e))},e}();o.default=i}},o={};!function t(i){if(o[i])return o[i].exports;var r=o[i]={exports:{}};return e[i].call(r.exports,r,r.exports,t),r.exports}(20)})();
//# sourceMappingURL=bundle.js.map