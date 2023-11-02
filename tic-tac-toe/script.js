const iconBtns = document.querySelector('.icon-btns').querySelectorAll('i');
const btns = document.querySelector('.btns').querySelectorAll('button');
const selectMark = document.querySelector('.wrapper');
const playGame = document.querySelector('.wrapper-1');
const othPlayer = document.querySelector('.othPlayer');
const submit = document.getElementById('submit-btn');
const iconsMark = document.querySelector('.choose-icon');
const grids = document.querySelector('.grid-container').querySelectorAll('div');
const enterTurn = document.querySelector('.container-top').querySelectorAll('div');
const overlay = document.querySelector('.back-wrapper');
const winner = document.querySelector('.win-display');
const nxtRound = document.getElementById('nxtBtn');
const quitBtn = document.getElementById('quitBtn');
const enterPlayer = document.querySelector('.container-bottom').querySelectorAll('div');


let turn = 'X';

//to check mark(X/O) selected by player 1
iconBtns.forEach((btn)=>{

  btn.addEventListener('click',()=>{

    iconBtns.forEach((btn)=>btn.classList.remove('active'))
    btn.classList.toggle('active');

  })

})

//function to set display property 
function display([...key],[...value]){
  
  for(let i = 0;i<key.length;i++){
        
    key[i].style.display = value[i]

  }

}

//function for your:mark and other player(Cpu/Player2):mark
function yourMrk(mrk,enP,name){

  if(mrk[0].className === iconBtns[1].className){

    enP[2].firstElementChild.innerText = `o(you)`;
    enP[0].firstElementChild.innerText = `x(${name})`;

  }
  else{

    enP[2].firstElementChild.innerText = `o(${name})`;
    enP[0].firstElementChild.innerText = `x(you)`;

  }

}

function XorO(btn,player2){

    const markChoose = [...iconBtns].filter((b) => b.classList.contains('active'));
  
    switch(btn){
    
      case 'cpu' : yourMrk(markChoose,enterPlayer,player2)
                   withCpu(markChoose);
      break;
      case 'player' : yourMrk(markChoose,enterPlayer,player2)
                      withPlayer();
      break;

    }

}

//play btn with cpu
btns[0].addEventListener('click',() => {
  
  XorO('cpu','cpu');
  btns[0].style.boxShadow = 'inset 1px 1px 4px hsl(39 88% 58%), inset -1px -1px 4px hsla(39, 87%, 50%, 0.898)'
  btns[0].style.background = 'var(--orangeHover)';
  setTimeout(()=>display([selectMark,playGame],['none','flex']),500)

})

//play btn with player2
btns[1].addEventListener('click',() => {

  const container = document.querySelector('.container');
  container.classList.add('transition');
  
  btns[1].style.boxShadow = 'inset 1px 1px 4px hsl(178 60% 48%), inset -1px -1px 4px hsla(178, 60%, 48%, 0.7)'
  btns[1].style.background = 'var(--lightBlueHover)';
  setTimeout(()=>{display([iconsMark,othPlayer],['none','flex']);},600)

})

//player2 name submit
submit.addEventListener('click',() => {

  const input = document.querySelector('input');
  if(input.value){
    display([othPlayer,selectMark,playGame],['none','none','flex']);
    XorO('player',input.value);
  }

})

function changeTurn(){return turn == 'X' ? 'O' : 'X' ;}

function checkWin(){
 
  const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  const fillMarks = [...grids].filter((grid)=>grid.innerText!='');
  let tie = 1;
  wins.map((e)=>{
    
    if(grids[e[0]].innerText!='' && grids[e[0]].innerText === grids[e[1]].innerText && grids[e[1]].innerText === grids[e[2]].innerText){

      winColor([e[0],e[1],e[2]],grids[e[0]].innerText);
      setTimeout(()=>displayWin(grids[e[0]].innerText),500);
      tie = 0;

    }

  })

  if(fillMarks.length == 9 && tie == 1) displayWin();

}

function winColor([...index],mark){

   for(let i=0; i<index.length; i++){

     mark == 'X' ?  grids[index[i]].style.background = 'var(--lightBlue)' : grids[index[i]].style.background = 'var(--orange)'

     grids[index[i]].style.color = 'var(--navy)';

   }

}

function displayWin(mrk=''){

  const winnerMrk = winner.querySelectorAll('p');

  overlay.classList.add('overlay');
  winner.style.display = 'flex';

  if(mrk == 'X'){
    winnerMrk[1].style.color = 'var(--lightBlue)';
    winnerMrk[1].querySelector('span').innerText = `${mrk}`;
  }
  else if(mrk == 'O'){
    winnerMrk[1].style.color = 'var(--orange)';
    winnerMrk[1].querySelector('span').innerText = `${mrk}`;
  }
  else{
    winnerMrk[1].style.color = 'var(--silver)';
    winnerMrk[1].querySelector('span').innerText = `tie`;
  }

}

nxtRound.addEventListener('click',()=>{

  const mrk = [...winner.children][1].querySelector('span').innerText
 
  if(mrk == 'X'){
    let xWins = Number([...enterPlayer[0].children][1].innerText);
    [...enterPlayer[0].children][1].innerText = ++xWins;
  }
  else if(mrk == 'O'){
    let oWins = Number([...enterPlayer[2].children][1].innerText);
    [...enterPlayer[2].children][1].innerText = ++oWins;
  }
  else{
    let ties = Number([...enterPlayer[1].children][1].innerText);
    [...enterPlayer[1].children][1].innerText = ++ties;
  }
  
  turn = 'X';
  overlay.classList.remove('overlay');
  winner.style.display = 'none';
  grids.forEach((grid) =>{
    grid.innerText = '';
    grid.style.background = '';
    grid.style.boxShadow ='';
  })
  enterTurn[1].firstElementChild.innerText = 'X';

})

const withPlayer = () => grids.forEach((grid)=>{
     
  grid.addEventListener('click',()=>{

    if(grid.innerText == ''){
    
    grid.style.boxShadow ='inset 1px 1px 6px hsl(199 35% 19%), inset -1px -1px 10px hsl(202 32% 15%)'
    grid.innerText = `${turn}`;
    turn == 'X' ? grid.style.color = 'var(--lightBlue)' : grid.style.color = 'var(--orange)';
    turn = changeTurn();
    enterTurn[1].firstElementChild.innerText = `${turn}`;
    checkWin();

   }

  })

})

const withCpu = (mrk) =>{

  /*
  const index = Math.floor(Math.random()*9);

  mrk[0].className === iconBtns[1].className ? grids[index].innerText = 'X' : grids[index].innerText = 'O' ;
  mrk[0].className === iconBtns[1].className ? grids[index].style.color = 'var(--lightBlue)' : grids[index].style.color = 'var(--orange)';
  */
 const body =  document.querySelector('body')
 body.innerText = 'IN PROCESS'
 body.style.fontSize = "2rem"
 body.style.color = 'White'


}

quitBtn.addEventListener('click',()=>{location.reload()})
