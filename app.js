/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

-floor -> in DOM, the method take out all the numbers after the dot. 

-Event listener i a function that call other functions without you make it. And it is not necessary to pu on the listener with parenteses for calling.

-Anonymous function it is the way the put a function directly in a function without give  a name to it.
*/
var scores, roundScore, activePlayer, gamePlaying=true;
var lastDice;

init();

document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-roll').addEventListener('click', function (){
    if(gamePlaying){        
        //1.random number
        var dice = Math.floor(Math.random()* 6)+1;
        var dice2 = Math.floor(Math.random()*6)+1;

        //2.Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src ='dice-'+ dice +'.png';
        
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src ='dice-'+ dice2 +'.png';        

        //3.Update the round score IF the rolled number was Not  1
        if(dice === 6 && lastDice === 6){
            scores[activePlayer] = 0;
            document.getElementById('score-'+activePlayer).textContent = '0';           
            nextPlayer();
        }
        else if(dice !== 1 && dice2 !== 1){
        //add score
        roundScore += dice + dice2;
        document.querySelector('#current-'+ activePlayer).textContent = roundScore;              
        }
        else{
            //next player            
            nextPlayer(); 
        }  
        lastDice = dice;
    }  
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //Add CURRENT score to GLOBA score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];

        var input = window.document.querySelector('.final-score').value;
        var winningScore;
        //undefined, 0, null or "" are coerced to false
        //anything else is coerced to true
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }

        // Check if player won the game
        if(scores[activePlayer] >= winningScore){
            document.getElementById('name-'+activePlayer).textContent = 'WINNER!'; 
             document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;

            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
        }else{
            //next player
            nextPlayer();
        }    
    }    
});

function nextPlayer(){
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.btn-hold').style.display = '';
    document.querySelector('.btn-roll').style.display = '';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');    
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}