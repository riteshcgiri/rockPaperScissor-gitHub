// creating guesses for computer
const guess = ["rock", "paper", "scissor"];
const random = Math.floor(Math.random() * guess.length);
let comGuess = guess[random];
    console.log( comGuess);

// creating vars
let currentRound = 1;
let myTimer;
let timeLeft = 10;
let timeUp = false;

// adding count-down aduio
let timer_audio = new Audio('../src/items/counter-audio.wav');
timer_audio.volume = 0.2;

// booleans
let comWin = false;
let playerWin = false;
let gameFinish = false;
let itsTie = false;

// getting vars from html
let roundNo = document.getElementById('roundNo');
let play = document.getElementById('play');
let pause = document.getElementById('pause');
let restart = document.getElementById('restart');
let settings = document.getElementById('settings');
let countDown = document.getElementById('countDown');
let yourChoice = document.getElementById('yourChoice');
let oppChoice = document.getElementById('oppChoice');
let gameArea = document.getElementById('gameArea');
let roundResult = document.getElementById('roundResult');
let playerChoosed;
//default showing data in dom
roundNo.innerHTML = `Round ${currentRound}`;
countDown.innerHTML = `${timeLeft}s`;
roundResult.innerHTML = `
<div class="rnd-rslt">
<span class="fs-3 text-center text-info">Let's Play</span>
<br> 
<span class="fs-1">
  <b class="text-warning">Rock </b> 
  <b class="text-danger">Paper </b>
  <b class="text-success">Scissor</b>
</span>
<br>
<span>Use <b class="text-success"> Enter</b> to Start game</span>
<br>
<span>Use <b class="text-success"> Backspace</b> to Pause Game</span>
<br>
<span>Use <b class="text-success"> Esc</b> to Restart game</span>
<br>
<span>Use <b class="text-success"> Mouse</b> to oprate game</span>
<br>
</div>
`;
// showing game option to dom
const screenBefore = `
      <!-- rock -->
      <button class="option" id="rock" value="Rock">
        <div class="card rock" style="width: 15rem;">
            <img src="../src/items/rock.png" class="card-img-top" alt="image-rock">
            <div class="card-footer text-center fw-bold  text-light">Rock</div>
        </div>
      </button>
      <!-- paper -->
      <button class="option" id="paper" value="Paper">
        <div class="card paper" style="width: 15rem;">
          <img src="../src/items/paper.png" class="card-img-top" alt="image-paper">
          <div class="card-footer text-center fw-bold  text-light">Paper</div>
        </div>
      </button>
      <!-- scissor -->
      <button class="option" id="scissor" value="Scissor">
        <div class="card scissor" style="width: 15rem;">
          <img src="../src/items/scissor.png" class="card-img-top" alt="image-scissor">
          <div class="card-footer text-center fw-bold  text-light">Scissor</div>
        </div>
      </button>
`;
gameArea.innerHTML = screenBefore;

// function to reload page after clicking the Esc button while game is finished 
let now = window.addEventListener('keyup',(e)=>{
  if(e.key === 'Escape'){
    roundResult.classList.remove('round-result');
  location.reload();
  }
  if(e.key === 'Enter'){
    startGame();  
  }
  if(e.key === 'Backspace'){
    pauseGame();  
  }
  // if (e.key === 'r' || e.key === 'R') {
  //   playerChoosed = 'rock';
  // }
  // else if (e.key === 'p' || e.key === 'P') {
  //   playerChoosed = 'paper';
  // }
  // else if (e.key === 's' || e.key === 'S') {
  //   playerChoosed = 'scissor';
  // }
  
});


// event listner to start game with mouse
play.classList.add('start');
play.addEventListener('click',()=>{
  startGame();  
  
play.classList.add('play');
});
// event listner to pause game with mouse
pause.addEventListener('click',()=>{
  pauseGame();
});
restart.addEventListener('click',()=>{
  restartGame();
});



// getting all chooseable option to create function
const gameCard = document.querySelectorAll('.option');

  // making array of option
  gameCard.forEach((element)=>{
  // checking which button is clicked
  element.addEventListener('click',()=>{
    // if (playerChoosed === null) {
      playerChoosed = element.id.toString();
    // }
    // checking wether payer win or losse
const screenAfter = `
<!-- rock -->
<div class="card ${playerChoosed} option" id="${playerChoosed}" style="width: 15rem;">
    <img src="../src/items/${playerChoosed}.png" class="card-img-top" alt="image-${playerChoosed}">
    <div class="card-footer text-center fw-bold  text-light">${playerChoosed.toUpperCase()}</div>
</div>
<!-- paper -->
<div class="card ${comGuess} option" id="${comGuess}" style="width: 15rem;">
  <img src="../src/items/${comGuess}.png" class="card-img-top" alt="image-${comGuess}">
  <div class="card-footer text-center fw-bold  text-light">${comGuess.toUpperCase()}</div>
</div>`;  

    if(playerChoosed === comGuess){
      console.log('It\'s Tie');
      currentRound++;
      gameFinish = true;
      itsTie = true;
      comWin = false;
      playerWin = false;
    }
    else {
      if(playerChoosed === 'rock' && comGuess === 'scissor'){
        console.log('You Win');
        playerWin = true;
        gameFinish = true;
        comWin = false;
        itsTie =false;
        gameArea.innerHTML = screenAfter;
      }
      else if(playerChoosed === 'scissor' && comGuess === 'paper'){
        console.log('You Win');
        gameFinish = true;
        playerWin = true;
        comWin = false;
        itsTie = false;
        gameArea.innerHTML = screenAfter;
      }
      else if(playerChoosed === 'paper' && comGuess === 'rock'){
        console.log('You Win');
        gameFinish = true;
        playerWin = true;
        comWin = false;
        itsTie = false;
        gameArea.innerHTML = screenAfter;
      }
      else{
        console.log('you lose');  
        gameFinish = true;
        comWin = true;
        playerWin = false;
        itsTie =false;
        gameArea.innerHTML = screenAfter;
      }
    }
    if (gameFinish == true) {
        timer_audio.pause();
        pause.disabled = true;
        pause.classList.add('d-none')
        restart.classList.remove('d-none');
    if (playerWin){ 
        player_win('Hooray!!'); 
        clearInterval(myTimer);
    }else if (comWin){ 
         com_win('Ohh No!!'); 
         clearInterval(myTimer);
    }else if (itsTie){ 
         its_tie('Wow!!'); 
         clearInterval(myTimer);
      }
    } 
  });
});
// if platyer win this function will show result on DOM
function player_win(reason){
  roundNo.innerHTML = `Round ${currentRound}`;
  roundResult.classList.remove('round-result');
  roundResult.innerHTML = `
  <div>
  <div class="my-3 text-success fs-4 text-center">You Choosed</div>
    <div class="card ${playerChoosed} option" id="${playerChoosed}" style="width: 15rem;">
      <img src="../src/items/${playerChoosed}.png" class="card-img-top" alt="image-${playerChoosed}">
      <div class="card-footer text-center fw-bold  text-light">${playerChoosed.toUpperCase()}</div>
    </div>
    </div>
    
    <!-- -->
    <div class="text-center"> 
      <span style="font-size: 50px;"> ${reason}</span>
        <br>
      <span style="font-size: 40px;" class="text-suceess">You Win</span>
        <br>
      <span style="font-size:34px;"> Press Esc to play again</span>
    </div>

   <div>
   <div class="my-3 text-success fs-4 text-center">Computer Choosed</div>
    <div class="card ${comGuess} option" id="${comGuess}" style="width: 15rem;">
      <img src="../src/items/${comGuess}.png" class="card-img-top" alt="image-${comGuess}">
      <div class="card-footer text-center fw-bold  text-light">${comGuess.toUpperCase()}</div>
    </div>
    </div>  
    `;
}
// if platyer loses this function will show result on DOM
function com_win(reason){
  roundNo.innerHTML = `Round ${currentRound}`;
  roundResult.classList.remove('round-result');
  roundResult.innerHTML = `
  <div>
  <div class="my-3 text-success fs-4 text-center">You Choosed</div>
  <div class="card ${playerChoosed} option" id="${playerChoosed}" style="width: 15rem;">
      <img src="../src/items/${playerChoosed}.png" class="card-img-top" alt="image-${playerChoosed}">
      <div class="card-footer text-center fw-bold  text-light"> ${playerChoosed.toUpperCase()}</div>
    </div>
    </div>
    <!-- -->
    <div class="text-center"> 
      <span style="font-size: 50px;"> ${reason}</span>
        <br>
      <span style="font-size: 40px;" class="text-suceess">You Loose</span>
        <br>
      <span style="font-size:34px;"> Press Esc to play again</span>
    </div>
    <div>
  <div class="my-3 text-success fs-4 text-center">Computer Choosed</div>
    <div class="card ${comGuess} option" id="${comGuess}" style="width: 15rem;">
      <img src="../src/items/${comGuess}.png" class="card-img-top" alt="image-${comGuess}">
      <div class="card-footer text-center fw-bold  text-light">${comGuess.toUpperCase()}</div>
    </div>  
    `;
}
function its_tie(reason){
  roundNo.innerHTML = `Round ${currentRound}`;
  roundResult.classList.remove('round-result');
  roundResult.innerHTML = `
  <div>
  <div class="my-3 text-success fs-4 text-center">You Choosed</div>
  <div class="card ${playerChoosed} option" id="${playerChoosed}" style="width: 15rem;">
  <img src="../src/items/${playerChoosed}.png" class="card-img-top" alt="image-${playerChoosed}">
  <div class="card-footer text-center fw-bold  text-light">${playerChoosed.toUpperCase()}</div>
</div>
</div>

<!-- -->
<div class="text-center"> 
  <span style="font-size: 50px;"> ${reason}</span>
    <br>
  <span style="font-size: 40px;" class="text-suceess">It's Tie</span>
    <br>
  <span style="font-size:34px;"> Press Esc to play again</span>
</div>

<div>
  <div class="my-3 text-success fs-4 text-center">Computer Choosed</div>
<div class="card ${comGuess} option" id="${comGuess}" style="width: 15rem;">
  <img src="../src/items/${comGuess}.png" class="card-img-top" alt="image-${comGuess}">
  <div class="card-footer text-center fw-bold  text-light">${comGuess.toUpperCase()}</div>
</div>
</div>  
`;
}
// function to set a timer which check the gamer choosed option within time or not if user take tiime more than timer he will loose
function set_timeout(){
  --timeLeft;
  countDown.innerHTML = `${timeLeft}s`;
  if (timeLeft === 0) {
    clearInterval(myTimer);
    gameFinish = true;
    playerWin = false;
    comWin = true;
    com_win('Time\'s Up');
  } 
}
// to start and pause game buttons

// function to start game
function startGame(){
  myTimer = setInterval(set_timeout, 1000);
  play.classList.add('d-none');
  pause.classList.remove('d-none');
  play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
</svg>`;
  timer_audio.play();
  roundResult.classList.add('round-result');  
}
// function to pause game
function pauseGame() {
  clearInterval(myTimer);
  pause.classList.add('d-none');
  play.classList.remove('d-none');
  timer_audio.pause();
  roundResult.classList.remove('round-result');
  
}
function restartGame() {
  location.reload();
  // myTimer = setInterval(set_timeout, 1000);
  // play.classList.add('d-none');
  // pause.classList.remove('d-none');
  // timer_audio.play();
  // roundResult.classList.add('round-result');  
  // clearInterval(myTimer);
  // pause.classList.add('d-none');
  // play.classList.add('d-none'); 
  // timer_audio.pause();
  // roundResult.classList.remove('round-result');  
}
