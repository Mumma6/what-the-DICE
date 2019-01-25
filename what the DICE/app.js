/**********************************************
* What the DICE.
**********************************************/

/// All the variables for the game
var scores, roundScore, activePlayer, gamePlaying, lastDice;

/// Call the function that starts the game.
init();

/// Add the Roll button and function.
document.querySelector(".btn-roll").addEventListener("click", function() {
	if(gamePlaying) {
		// Give a random number.
		var dice = Math.floor(Math.random() * 6) +1;

		// Display the dice and also change the dice img to match the var dice score.
		var diceDOM = document.querySelector(".dice");
		diceDOM.style.display = "block";
		diceDOM.src = "dice-" + dice + ".png";

		/// If you cast the same number twice you lose your current score
		if (dice === 1 && lastDice === 1 || 
			dice === 2 && lastDice === 2 ||
			dice === 3 && lastDice === 3 ||
			dice === 4 && lastDice === 4 ||
			dice === 5 && lastDice === 5 ||
			dice === 6 && lastDice === 6) {
			scores[activePlayer] = 0;
			document.querySelector("#current-" + activePlayer).textContent = 0;
			document.querySelector(".btn-roll").disabled = true;
			setTimeout(nextPlayer, 1500);
		// Update the round score IF the rolled number is NOT a 1.
		} else if (dice !== 1) {
			// Add score and display it.
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
			///diceDOM.style.border = "none";
		} else {
			//diceDOM.style.border = "10px solid red";
			document.querySelector(".btn-roll").disabled = true;
			setTimeout(nextPlayer, 1500);	
		}

		lastDice = dice;
	}
});

/// Add the Hold button and function.
document.querySelector(".btn-hold").addEventListener("click", function() {
	if (gamePlaying) {
		// Add current score to global score
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

		// Check if player won the game
		if (scores[activePlayer] >= 100) {
			document.querySelector("#name-" + activePlayer).textContent = "Winner!";
			document.querySelector(".dice").style.display = "none";
			document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
			document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

/// Change the player function.
function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		document.getElementById("current-0").textContent = "0";
		document.getElementById("current-1").textContent = "0";

		document.querySelector(".player-0-panel").classList.toggle("active");
		document.querySelector(".player-1-panel").classList.toggle("active");
		
		document.querySelector(".dice").style.display = "none";
		document.querySelector(".btn-roll").disabled = false;

		/// Resting the value of lastDice or else the nextplayer gets fucked
		lastDice = 0;
		
};

/// Add the New Game button and function.
document.querySelector(".btn-new").addEventListener("click", init);

/// The function that starts the game
function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	// Make the dice "invisible" from the start.
	document.querySelector(".dice").style.display = "none";

	// Make all the scores to zero for both players.
	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";

	// Reset the player names.
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "player 2";

	// Reset the player panels.
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
}

/// Get modal element, open button and close button.
var modal, modalBtn, closeBtn

modal = document.getElementById("simpleModal");
modalBtn = document.getElementById("modalBtn");
closeBtn = document.getElementsByClassName("closeBtn")[0];

/// Open modal
modalBtn.addEventListener("click", function() {
	modal.style.display = "block";
});

/// Close Modal with close button
closeBtn.addEventListener("click", function() {
	modal.style.display = "none";
});

// Close with outside click
window.addEventListener("click", function (e) {
	if(e.target == modal) {
		modal.style.display = "none";
	}
});