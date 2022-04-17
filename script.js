// CACHE THE DOM
const userLabel = document.getElementById('user-label');
const userScoreLabel = document.getElementById('user-score');
const userSpot = document.getElementById('user-spot')
const userSpotLabel = document.getElementById('user-spot-label');
const compScoreLabel = document.getElementById('comp-score');
const compSpot = document.getElementById('comp-spot')
const compSpotLabel = document.getElementById('comp-spot-label');
const maxValue = document.getElementById('max-value')
const maxBoard = document.getElementById('max-board');
const gameInfo = document.getElementById('game-info');
const red = document.getElementById('r');
const redBg = document.getElementById('option-red-background');
const black = document.getElementById('b');
const blackBg = document.getElementById('option-black-background');
const reset = document.getElementById('reset');


// GET DEFAULT VALUES
const userSpotContent = userSpotLabel.innerHTML;
const compSpotContent = compSpotLabel.innerHTML;
const gameInfoContent = gameInfo.innerHTML;


// GLOBAL VARIABLES
var userScore = 0;
var compScore = 0;
var maxScore = 10;

//listener for maxBoard to change max score;
maxBoard.addEventListener('dblclick', () => changeMax('max-value'))

function changeMax(id){
    var change = document.getElementById(id);
    var originalValue = change.innerHTML;
    var newValue = prompt('Enter a Maximum value [<= 100].', originalValue)
    newValue = Number(newValue);
    
    if(newValue[0] !== " " && newValue.length !== 0 && newValue <= 100 && newValue >0 && newValue != "undefined" && newValue != isNaN){
        maxScore = newValue;
        maxValue.innerHTML = maxScore;
    } else{
        maxValue.innerHTML = originalValue;
    }
}



//LISTENER FOR USER LABEL
userLabel.addEventListener('dblclick', function(){changeName('user-label')});
// FUNCTION FOR USER TO CHANGE LABEL
function changeName(id){
    var change = document.getElementById(id);
    var originalName = change.innerHTML;

    var newName = prompt('Enter your name Here.', originalName);
    while (true){
        
        if(newName.length > 10 && newName[0] === " "){
            alert("Name is too long! \nIt shouldn't exceed 10 characters \nor begin with an empty character.")
        var newName = prompt('Enter your name Here.', originalName);
        } else if (newName.length > 10){
            alert("Name is too long! \nIt shouldn't exceed 10 characters.")
            var newName = prompt('Enter your name Here.', originalName);
        }else if(newName[0] === " "){
            alert("Name shouldn't begin with an empty character.")
            var newName = prompt('Enter your name Here.', originalName);
        } else {
            break;
        }
        
    }

    // CONVERT NAME TO SENTENCE CASE
    newName = newName[0] + newName.slice(1, newName.length).toLocaleLowerCase();
  
    // ADJUST LABEL POSITION BASED ON NAME LENGTH;
    var adjust = '-' + newName.length -2 + 'vmin';
    userLabel.style.left = adjust;

    if (newName[0] === " " || newName.length === 0){
        change.innerHTML = originalName;
    } else {
        change.innerHTML = newName;
    }
    
}

// CUMPUTER CHOOSE BY RANDOM
function randNum(){
    var rand = Math.floor(Math.random() * 2);
    if(rand === 0) return "r";
    return "b";
}

// SET LISTENERS TO GET USER'S GUESS;

red.addEventListener('click', () => main('r'));
black.addEventListener('click', () => main('b'));

function main(id){
    var compGuess = randNum();
    var userGuess = id;
    switch(compGuess + userGuess){
        case 'rr':
        case 'bb':
            win(userGuess, compGuess);
            break;
        case 'rb':
        case 'br':
            loose(userGuess, compGuess)
    }
    
}

function win(user, comp){
    if(userScore >= maxScore || compScore >= maxScore){
        maxScoreReached()
        
    } else {
        gameInfo.innerHTML = `WIN`;
        userScore += 1;
        userScoreLabel.innerHTML = userScore;

    var styling;
    if (user === 'r'){
        styling = document.getElementById('option-red-background'); 

        // change spot labels
        userSpotLabel.innerHTML = 'Red';
        compSpotLabel.innerHTML = 'Red';

        //modify spots color;
        userSpot.classList.add('red-spot');
        userSpot.classList.remove('black-spot');
        compSpot.classList.add('red-spot');
        compSpot.classList.remove('black-spot');

    } else if (user === 'b'){
        styling = document.getElementById('option-black-background');

        // change spot labels
        userSpotLabel.innerHTML = 'Black';
        compSpotLabel.innerHTML = 'Black';
        
        //modify spots color;
        userSpot.classList.add('black-spot');
        userSpot.classList.remove('red-spot');
        compSpot.classList.add('black-spot');
        compSpot.classList.remove('red-spot');
    }

    // ADD THE GLOW EFFECT CLASS FOR WIN
    styling.classList.add('win');
    setTimeout(() => styling.classList.remove('win'), 300)
    }
}


function loose(user, comp){
    if(userScore >= maxScore || compScore >= maxScore){
        maxScoreReached()
    } else {
        gameInfo.innerHTML = `LOOSE`;
    compScore += 1;
    compScoreLabel.innerHTML = compScore;

    var styling;
    if (user === 'r'){
        styling = document.getElementById('option-red-background'); 

        // change spot labels
        userSpotLabel.innerHTML = 'Red';
        compSpotLabel.innerHTML = 'Black';

        //modify spots color;
        userSpot.classList.add('red-spot');
        userSpot.classList.remove('black-spot');
        compSpot.classList.add('black-spot');
        compSpot.classList.remove('red-spot');

    } else if (user === 'b'){
        styling = document.getElementById('option-black-background');

        // change spot labels
        userSpotLabel.innerHTML = 'Black';
        compSpotLabel.innerHTML = 'Red';

        //modify spots color;
        userSpot.classList.add('black-spot');
        userSpot.classList.remove('red-spot');
        compSpot.classList.add('red-spot');
        compSpot.classList.remove('black-spot');

    }

    //ADD THE GLOW EFFECT CLASS FOR LOOSE
    styling.classList.add('loose');
    setTimeout(() => styling.classList.remove('loose'), 300)
    }
}

function maxScoreReached(){
    // MODIFY CONTENTS
    gameInfo.innerHTML = "max score reahed";
    userSpotLabel.innerHTML = "Restart";
    userSpotLabel.style.marginLeft = "1vmin";
    compSpotLabel.innerHTML = "Restart";
    compSpotLabel.style.marginLeft = "1vmin";

    //modify spots color;
    userSpot.classList.add('black-spot');
    userSpot.classList.remove('red-spot');
    compSpot.classList.add('black-spot');
    compSpot.classList.remove('red-spot');
}

// RESET SCORES WITH THE RESET BUTTON
// event listener for reset button
reset.addEventListener('click', () => resetScores('reset'));

function resetScores(id){
    //RESET SCORES
    userScore = 0;
    compScore = 0;
    userScoreLabel.innerHTML = userScore;
    compScoreLabel.innerHTML = compScore;

    // CORRECT SPOT LABEL POSITION
    userSpotLabel.style.marginLeft = "3vmin";
    compSpotLabel.style.marginLeft = "3vmin";

    // RESTORE DEFAULT CONTENTS
    userSpotLabel.innerHTML = userSpotContent;
    compSpotLabel.innerHTML = compSpotContent;
    gameInfo.innerHTML = gameInfoContent;

    // REMOVE ALL CLASSES
    userSpot.classList.remove('black-spot');
    userSpot.classList.remove('red-spot');
    compSpot.classList.remove('black-spot');
    compSpot.classList.remove('red-spot');
}