document.querySelector('.js-button-rock').addEventListener('click', () => playGame('rock'));
document.querySelector('.js-button-paper').addEventListener('click', () => playGame('paper'));
document.querySelector('.js-button-scissors').addEventListener('click', () => playGame('scissors'));
document.querySelector('.js-button-reset').addEventListener('click', () => resetResult());
document.querySelector('.js-button-auto-play').addEventListener('click', () => changText());

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0, 
    loses: 0, 
    ties: 0
};

updateResult();

function pickComputerMove(){
    const randomNumber = Math.random();
    let result = '';
    if(randomNumber > 0 && randomNumber < 1/3){
        result = 'rock';
    }else if(randomNumber >= 1/3 && randomNumber < 2/3){
        result = 'paper';
    }else if(randomNumber >= 2/3 && randomNumber < 1){
        result = 'scissors';
    }

    return result;
}



function playGame(playerMove){

    document.querySelector('.js-p-result').classList.remove('hidden-element');
    document.querySelector('.js-p-move').classList.remove('hidden-element');

    const computerMove = pickComputerMove();
    let result = '';
    if(playerMove === 'rock'){
        if(computerMove === 'rock'){
            result = 'Tie.';
        }else if(computerMove === 'paper'){
            result = 'You lose.';
        }else if(computerMove === 'scissors'){
            result = 'You win.';
        }
    }else if(playerMove === 'paper'){
        if(computerMove === 'rock'){
            result = 'You win.';
        }else if(computerMove === 'paper'){
            result = 'Tie.';
        }else if(computerMove === 'scissors'){
            result = 'You lose.';
        }
    }else if(playerMove === 'scissors'){
        if(computerMove === 'rock'){
            result = 'You lose.';
        }else if(computerMove === 'paper'){
            result = 'You win.';
        }else if(computerMove === 'scissors'){
            result = 'Tie.'
        }
    }

    if(result === 'You win.'){
        score.wins += 1;
    }else if(result === 'You lose.'){
        score.loses += 1;
    }else if(result === 'Tie.'){
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    // console.log('hello');
    document.querySelector('.js-p-result').innerHTML = result;
    document.querySelector('.js-p-move').innerHTML = 
    `
        You 
            <img src="images/${playerMove}-emoji.png" alt="" class="btn-icon">
            <img src="images/${computerMove}-emoji.png" alt="" class="btn-icon">
        Computer
    `;
    console.log(score);

    updateResult();
}

function updateResult(){
    document.querySelector('.js-p-score').innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}

function resetResult(){
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.setItem('score', JSON.stringify(score));

    updateResult();

    stopPlay();
    document.querySelector('.js-button-auto-play').classList.remove('red-btn');
    document.querySelector('.js-button-auto-play').innerHTML = 'Auto Play';
    

    document.querySelector('.js-p-result').classList.add('hidden-element');
    document.querySelector('.js-p-move').classList.add('hidden-element');
}

let intevalId = '';
function autoPlay(){
    intevalId = setInterval(() => {
        const playerMoveCom = pickComputerMove();
        playGame(playerMoveCom);
    }, 1000);
}

function stopPlay(){
    clearInterval(intevalId);
    updateResult();
}

function changText(){
    let autoPlayText = document.querySelector('.js-button-auto-play');
    if(autoPlayText.innerHTML === 'Auto Play'){
        autoPlay();
        // autoPlayText.classList.add('color-button-stop');
        autoPlayText.classList.add('red-btn');
        autoPlayText.innerHTML = 'Stop Play';
    }else{
        stopPlay();
        autoPlayText.innerHTML = 'Auto Play';
        autoPlayText.classList.remove('red-btn');

    }
    
}

// console.log(document.querySelector('.js-button-auto-play').innerHTML);



