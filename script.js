let isTracking = false;
let startTime;
let endTime;
let totalTime;
let interval;

const startStopBtn = document.getElementById('startStopBtn');
const timeDisplay = document.getElementById('timeDisplay');

startStopBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (isTracking) {
        clearInterval(interval);
        startStopBtn.textContent = 'Start Coding';
        const endTime = Date.now();
        saveSession(startTime, endTime, totalTime);
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

// All above is related to the start/stop btn and timer

// All below is related local storage of the timer\

function saveSession(startTime, endTime) {
    const today = new Date().toISOString().split('T')[0]; // should print out "YY-MM-DD"

    //retrieve existing data from local storage using parse
    const data = JSON.parse(localStorage.getItem('timeData') || '{}');
    // Todays Sessions
    data[today] = {
        startTime: startTime,
        endTime: endTime,
        totalTime: totalTime,
    };

    // Save to local storage
    localStorage.setItem('timeData', JSON.stringify(data));
    updateTable();
};


// cp for displaying data edit to fit needs when finished
function getSessions() {
    return JSON.parse(localStorage.getItem('timeData') || '{}');
};


const sessions = getSessions();
const table = document.createElement('table');

for (const date in sessions) {
  const row = document.createElement('tr');
  const dateCell = document.createElement('td');
  dateCell.textContent = date;
  const timeCell = document.createElement('td');
  timeCell.textContent = sessions[date].totalTime / 1000 + ' seconds';
  row.appendChild(dateCell);
  row.appendChild(timeCell);
  table.appendChild(row);
}

document.body.appendChild(table);

//Another copy paste

function updateTable() {
    const sessions = JSON.parse(localStorage.getItem('timeData') || '{}');
    const timeTableBody = document.getElementById('timeTableBody');
    timeTableBody.innerHTML = ''; // Clear existing rows
  
    let weeklyTotal = 0;
  
    // Loop through the last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
  
      const row = document.createElement('tr');
      const dateCell = document.createElement('td');
      dateCell.textContent = dateString;
      const timeCell = document.createElement('td');
  
      if (sessions[dateString]) {
        const timeInSeconds = sessions[dateString].totalTime / 1000;
        timeCell.textContent = timeInSeconds;
        weeklyTotal += timeInSeconds;
      } else {
        timeCell.textContent = '0';
      }
  
      row.appendChild(dateCell);
      row.appendChild(timeCell);
      timeTableBody.appendChild(row);
    }
  
    // Update the weekly total
    document.getElementById('weeklyTotal').textContent = weeklyTotal;
  }
  
  // Call this function whenever you want to update the table, e.g., after saving a session
  updateTable();

//organize code is the next step here