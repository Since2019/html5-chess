## ChessPiece.ts 逻辑介绍


### 属性
棋子的数据和显示是分开的,显示用 HTML Element来进行处理，用的是 `<img />` tag

point, active, board, color 属性是数据属性

state 在开发之初用于做状态跟踪，但是随着开发过程逐渐深入，这个已经不再使用了


### attachMoveToGridListener移动监听器
监听器侦听的是点击事件。

<p> 
I.首次点击，判断是否选择了棋子。如果选择了某个棋子，那么就会根据该枚棋子的 role 来搜索可进入的格子

此处用了一个trick来判断点击的是棋子还是格子。
我们的棋盘使用了Grid Layout,每一个点都是一个 `div`
如果点击的 `e.target.tagName` 是 `img`, 那么点击的是棋子，因为棋子有`img`, 如果不是，那么就点击了 div
</p>


<p>
II.二次点击，判断是否选择了格子，如果选择了格子，那么就移动到格子里

① 如果是
</p>


