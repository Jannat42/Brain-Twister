let timer;
let seconds = 0;
let minutes = 0;

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const secondsElement = document.getElementById("seconds");
const minutesElement = document.getElementById("minutes");

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        secondsElement.innerText = seconds < 10 ? `0${seconds}` : seconds;
        minutesElement.innerText = minutes < 10 ? `0${minutes}` : minutes;
    }, 1000);

    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = true;
}

function stopTimer() {
    clearInterval(timer);
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
}

function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    secondsElement.innerText = "00";
    minutesElement.innerText = "00";
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
