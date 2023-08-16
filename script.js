let isTracking = false;
let startTime;
let interval;

const startStopBtn = document.getElementById('startStopBtn');
const timeDisplay = document.getElementById('timeDisplay');

startStopBtn.addEventListener('click', function() {
    if (isTracking) {
        clearInterval(interval);
        startStopBtn.textContent = 'Start Coding';
    } else {
        startTime = Date.now();
        interval = setInterval(updateTimeDisplay, 1000);
        startStopBtn.textContent = 'Stop Coding';
    }
    isTracking = !isTracking;
});

function updateTimeDisplay() {
    const now = Date.now();
    const elapsedMilliseconds = now - startTime;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

    timeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}