const guessInput =
    document.getElementById("guessInput");

const guessBtn =
    document.getElementById("guessBtn");

const restartBtn =
    document.getElementById("restartBtn");

const attemptCount =
    document.getElementById("attemptCount");

const message =
    document.getElementById("message");

const resultSection =
    document.getElementById("resultSection");

const resultMessage =
    document.getElementById("resultMessage");


let secretNumber;

let attempts;

let gameOver = false;


function generateNumber() {

    return Math.floor(
        Math.random() * 100
    ) + 1;

}


function startGame() {

    secretNumber =
        generateNumber();

    attempts = 0;

    gameOver = false;

    attemptCount.textContent =
        attempts;

    guessInput.value = "";

    guessInput.disabled = false;

    guessBtn.disabled = false;

    guessBtn.classList.remove("hidden");

    restartBtn.classList.add("hidden");

    resultSection.classList.add("hidden");

    message.textContent = "";

    message.className = "message";

    guessInput.focus();

}


function showMessage(
    text,
    type
) {

    message.textContent = text;

    message.className =
        `message ${type}`;

}


function checkGuess() {

    if (gameOver) {
        return;
    }


    const guess =
        Number(guessInput.value);


    if (
        guessInput.value.trim() === ""
    ) {

        showMessage(
            "Please enter a number.",
            "error"
        );

        return;

    }


    if (
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {

        showMessage(
            "Please enter a whole number between 1 and 100.",
            "error"
        );

        return;

    }


    attempts++;

    attemptCount.textContent =
        attempts;


    if (guess < secretNumber) {

        showMessage(
            "Too low! Try a higher number.",
            "low"
        );

    }


    else if (guess > secretNumber) {

        showMessage(
            "Too high! Try a lower number.",
            "high"
        );

    }


    else {

        gameOver = true;

        guessInput.disabled = true;

        guessBtn.disabled = true;

        restartBtn.classList.remove(
            "hidden"
        );

        resultSection.classList.remove(
            "hidden"
        );

        resultMessage.textContent =
            `You guessed the number ${secretNumber} correctly in ${attempts} ${attempts === 1 ? "attempt" : "attempts"}!`;

        showMessage(
            "Correct! 🎉",
            "success"
        );

    }


    guessInput.select();

}


guessBtn.addEventListener(
    "click",
    checkGuess
);


restartBtn.addEventListener(
    "click",
    startGame
);


guessInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            checkGuess();

        }

    }
);


startGame();