const gameBoard = (
    function Board(){
        let board = [["","",""],["","",""],["","",""]];
        
        

        function SetX(x,y){
            if(board[x][y]===""){
                board[x][y] = "X";
            }
        }

        function SetY(x,y){
            if(board[x][y] === ""){
                board[x][y] = "Y";
            }
        }

        function isX(x,y){
            return board[x][y]==="X";
        }

        function isY(x,y){
            return board[x][y] === "Y";
        }

        function getBoard(){
            return board;
        }
        return {SetX,SetY,isX,isY,getBoard};
    }
)();


const GamePlay = (
    function game(){
       let turn = true;
       function play(x,y){
           if(turn){
            //x-moves
            gameBoard.SetX(x,y);
            turn = !turn;
           }else{
            //y-moves
            gameBoard.SetY(x,y);
            turn = !turn;
           }
       }


       function checkXwin(){
          //const {xUsed,yUsed} = gameBoard.getXYpos();
          //check first diag
          let fdiag = true;
          let secdiag = true;
          let row = false;
          let col = false;
          for(let i = 0;i<3;i++){
            if(!gameBoard.isX(i,i)){
                fdiag  = false;
                break;
            }
          }
          

          for(let i = 0;i<3;i++){
            if(!gameBoard.isX(i,2-i)){
                secdiag = false;
                break;
            }
          }
          
          for(let i = 0;i<3;i++){
            let win = true;
            for(let j = 0;j<3;j++){
                if(!gameBoard.isX(i,j)){
                   win = false;
                   break;
                }
            }
            row = row || win;
          }

          for(let j = 0;j<3;j++){
            let win = true;
            for(let i = 0;i<3;i++){
               if(!gameBoard.isX(i,j)){
                win = false;
                break;
               }
            }
            col = col || win;
          }

          return col||row||fdiag||secdiag;
       }



        function checkYwin(){
          //const {xUsed,yUsed} = gameBoard.getXYpos();
          //check first diag
          let fdiag = true;
          let secdiag = true;
          let row = false;
          let col = false;
          for(let i = 0;i<3;i++){
            if(!gameBoard.isY(i,i)){
                fdiag  = false;
                break;
            }
          }
          

          for(let i = 0;i<3;i++){
            if(!gameBoard.isY(i,2-i)){
                secdiag = false;
                break;
            }
          }
          
          for(let i = 0;i<3;i++){
            let win = true;
            for(let j = 0;j<3;j++){
                if(!gameBoard.isY(i,j)){
                   win = false;
                   break;
                }
            }
            row = row || win;
          }

          for(let j = 0;j<3;j++){
            let win = true;
            for(let i = 0;i<3;i++){
               if(!gameBoard.isY(i,j)){
                win = false;
                break;
               }
            }
            col = col || win;
          }

          return col||row||fdiag||secdiag;
       }

       return {checkXwin,checkYwin,play};
    }


    
)();

const display = (
    function displayGame(){

        function init(){
              const gameboard = document.getElementById("gameboard");
              gameboard.addEventListener("click",handleClick);
              render();
        }
        function handleClick(e){
           if(!e.target.classList.contains('btn'))return;
           const gamewin = document.getElementById("gamewin");
           const row = e.target.dataset.row;
           const col = e.target.dataset.col;
        
           GamePlay.play(row,col);
        
           render();
           if(GamePlay.checkXwin()){
             gamewin.innerHTML=`<h1>${"X wins"}</h1>`;
           }else if(GamePlay.checkYwin()){
             gamewin.innerHTML=`<h1>${"Y wins"}</h1>`;
           }
        
        
        }

        function render(){
         
         let temp = ``
         const board = gameBoard.getBoard();
         for(let i=0;i<3;i++){
            let text = `<div>`;
            for(let j=0;j<3;j++){
                text += `<button class=${"btn"} data-row=${i} data-col=${j}>${board[i][j]}</button>`
            }
            text+=`</div>`;
            temp+=text;
         }
         temp+=``
         gameboard.innerHTML=temp;
         
       }
       
       

       return {init};
    }
)();

display.init();