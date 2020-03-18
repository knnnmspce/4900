  var malwares = [
      "ransomware",
      "virus",
      "keylogger",
      "trojan",
      "spyware",
      "adware",
      "worm",
      "rootkit",
      "bots"
  ];

  var hints = [
      "Designed to block access to a computer system until a sum of money is paid",
      "Piece of code capable of copying itself while having a detrimental effect on a users system",
      "Records every keystroke made by a user",
      "Program that looks legitimate but can take control of your computer",
      "Obtains and transmits covert info about a persons computer activities",
      "Automatically displays or downloads undesired advertising material when a user is online",
      "Replicates itself in order to spread harm to other computers typically using a computer network",
      "Set of tools that enable an unauthorized user to gain control of a computer system undetected",
      "Can be used maliciously in many ways, including in DOS attacks"
  ];

  let answer = '';
  let maxWrong = 5;
  let mistakes = 0;
  let lives = 5;
  let guessed = [];
  let wordStatus = null;
  let hintIndex = '';
  let wordsGenerated = [];

 function randomWord() {
     answer = malwares[Math.floor(Math.random() * malwares.length)]; 
     hintIndex = malwares.indexOf(answer);
 }

 function generateList() {
    var i;
    for (i = 0; i < 3; i++) {
        randomWord()
        if (wordsGenerated.indexOf(answer) == -1){
            wordsGenerated.push(answer);
        }
    }
 }

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
        <button
            class="btn btn-lg btn-primary m-2"
            id='` + letter + `'
            onClick="handleGuess('` + letter + `')"
        >
            ` + letter + `
        </button>
        `).join('');
  
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

/* document.addEventListener('keypress', (event) => {
    let keyword = String.fromCharCode(event.keyCode);
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if(answer.indexOf(chosenLetter) >= 0){
        guessedWord();
        checkWin();
    } else if (answer.indexOf(chosenLetter) === -1) {
        lives--;
        updateLives();
        //updateBackground();
        checkLost();
        
    }
}); */

function handleGuess(chosenLetter){
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
    document.getElementById(chosenLetter).style.display = 'none';

    if(answer.indexOf(chosenLetter) >= 0){
        guessedWord();
        checkWin();
    } else if (answer.indexOf(chosenLetter) === -1) {
        lives--;
        updateLives();
        //updateBackground();
        checkLost();
        
    }
}

/* function updateBackground() {

}
 */
function checkWin() {
    if(wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = "YOU WIN!!";
    }
}

function checkLost() {
    if(lives === 0){
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = "YOU LOSE!!";
    }
}

function guessedWord(){
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter: "_ ")).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus;
    document.getElementById('hint').innerHTML = hints[hintIndex];
}

function updateLives() {
    document.getElementById('lives').innerHTML = lives;
}

/* function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
} */

function previousWord(){
    guessed = [];

    //answer = wordsGenerated[answer-1];
    guessedWord();
    generateButtons();
}

function nextWord(){
    guessed = [];
    
    randomWord();
    guessedWord();
    generateButtons();
}

function reset(){
    mistakes = 0;
    lives = 5;
    guessed = [];

    randomWord();
    guessedWord();
    updateLives();
    generateButtons();

}

document.getElementById('lives').innerHTML = lives;


  
 randomWord();
 generateButtons();
 guessedWord();