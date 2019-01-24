/**********************************************
*** What the DICE.
**********************************************/

/// Varibels for player score, round score, who is the active player and is the game running.
var scores, roundScore, activePlayer, gamePlaying;

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

		// Update the round score IF the rolled number is NOT a 1.
		if (dice !== 1) {
			// Add score and display it.
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			// next players turn.
			nextPlayer();
		}
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