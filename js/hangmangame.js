var mariofranchise_characters = [
    "mario",
    "luigi",
    "princesspeach",
    "toad",
    "yoshi",
    "princessdaisy",
    "donkeykong",
    "diddykong",
    "rosalina",
    "toadette",
    "birdo",
    "toadsworth",
    "captaintoad",
    "pauline"
]
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let audio;
let wordStatus = null;



function randomWord() {
    answer = mariofranchise_characters[Math.floor(Math.random() * mariofranchise_characters.length)];
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
        <button
          class="btn btn-outline-warning active m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}


function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('sound-win').play();
        document.getElementById('keyboard').innerHTML = "";
        document.getElementById('keyboard').innerHTML = alert("Congratulations!You won!");
        document.getElementById('keyboard').innerHTML = "Let's Play again! ";


    }
}

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('sound-lose').play();
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = alert("Better luck next time... ");
        document.getElementById('keyboard').innerHTML = "Let's Play again! ";



    }


}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.jpg';

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();