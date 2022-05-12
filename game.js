// cach player pic to do animation
//const animation = document.querySelector('img.player-hand');
const animation = document.getElementById("hands");

let amountClick = 0;
let gameResult = [];
let winAmount = [];
let loseAmount = [];

// when player click to Play Game Button
function playGame() {
    document.getElementById("game").style.display = "block";
    document.getElementById("playButton").style.display = "none";
    document.getElementById("playAgain").style.display = "none";
}

// After click playagain
function restartGame() {
    document.getElementById("playAgain").style.display = "block";
    document.getElementById("playButton").style.display = "none";
    document.getElementById("game").style.display = "none";
}

//When game restart. All value will emptyed
function playAgain() {
  playGame();
  amountClick = 0;
  gameResult = [];
  document.getElementById('player-result').innerHTML = '0';
  document.getElementById('computer-result').innerHTML = '0';
}

// when user win computer
function userWin() {
  gameResult.push("win");
  winAmount = gameResult.filter(word => word === "win");
  document.getElementById('player-result').innerHTML=winAmount.length;
  console.log(gameResult);
}
// when computer win
function userLose() {
  gameResult.push("lose");
  winAmount = gameResult.filter(word => word === "lose");
  document.getElementById('computer-result').innerHTML=winAmount.length;
  console.log(gameResult);
}

// Play game
function getId(clicked) {

  // get user's and computer value, and change pic
    var userChoice = clicked;
    const allResults = ["rock", "paper", "scissors"];
    const computerChoice = allResults[Math.floor(Math.random()*allResults.length)];
    const computerImage = document.querySelector('img.computer-hand');
    const playerImage = document.querySelector('img.player-hand');

    //animation start
    animation.addEventListener('animationstart', () => {
        playerImage.src =  `rock.png`;
        computerImage.src = `rock.png`;
        document.getElementById("options").style.display = "none";
        document.querySelector('h2.winner').style.display = "none"
      });
      // animation repeart
      animation.addEventListener('animationiteration', () => {
        playerImage.src =  `rock.png`;
        computerImage.src = `rock.png`;
      });
      // animation end
      animation.addEventListener('animationend', () => {
        playerImage.src =  `${userChoice}.png`;
        computerImage.src = `${computerChoice}.png`;
        document.getElementById("options").style.display = "block";
        document.querySelector('h2.winner').style.display = "block";
        animation.classList.remove('active');
      });

      // check 3 in a row
      function check3inRow() {
        for (let i = 0; i < gameResult.length; i++) {
          if (gameResult[i] == gameResult[i+1] && gameResult[i+1] == gameResult[i+2] && gameResult[i] =='win') {
            document.getElementById('result').innerHTML = 'Win! You won 3 times in a row ';
            restartGame();
          } else if (gameResult[i] == gameResult[i+1] && gameResult[i+1] == gameResult[i+2] && gameResult[i] =='lose') {
            document.getElementById('result').innerHTML = 'Lose! Computer 3 times in a row ';
            restartGame();
          }
        }
      }

      amountClick +=1;
        if (amountClick<8) {
          // total 9 cases. 3 tie, 3 win, 3 lose. After 2s win or lose, result will update
          // draw when user' choise is same computer's choice
          if (userChoice ===  computerChoice ) 
           {
              gameResult.push("draw");
              console.log(gameResult);
            } 
            // 3 cases user win  1.{rock win scissors} 2.{paper win rock} 3.{scissors win paper}
            else if (userChoice === 'rock' && computerChoice === "scissors") {
              setTimeout(() => {
                userWin(); check3inRow();
              }, 2300);
            } else if (userChoice === 'paper' && computerChoice === "rock") {
              setTimeout(() => {
                userWin(); check3inRow();
              }, 2300);
    
            } else if (userChoice === 'scissors' && computerChoice === "paper") {
              setTimeout(() => {
                userWin(); check3inRow();
              }, 2300);
            }
            // 3 others cases computer win 
            else {
              setTimeout(() => {
                check3inRow();userLose();
              }, 2300);              
          }
      }
      // when 7 time is clicked
      else{
          // Win. When win amount of user is bigger than win amount of computer
          if (winAmount.length > loseAmount.length) {
            document.getElementById('result').innerHTML = 'Congratulations ! You Win! You won ' + winAmount.length + ' /7';
          // Lose. When win amount of computer is bigger than win amount of user
          } else if(loseAmount.length>winAmount.length){
            document.getElementById('result').innerHTML = 'Try aganin. You lose. Computer won ' + loseAmount.length + ' /7';
          }
          else{
            document.getElementById('result').innerHTML = 'Draw! You won ' + winAmount.length + ' . Computer won ' + loseAmount.length;
          }
          restartGame();
      }
}

for (var i = 0; i < 3 ; i++) {
    document.querySelectorAll(".activate")[i].addEventListener("click", function() {
        animation.classList.toggle('active');
    });
}

