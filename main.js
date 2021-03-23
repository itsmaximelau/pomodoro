//Initial time values
var initialWorkMinutes = 0;
var initialWorkSeconds = 1;
var initialPauseMinutes = 0;
var initialPauseSeconds = 1;
var initialLongPauseMinutes = 0;
var initialLongPauseSeconds = 1;

// Current time value
var minutes = initialWorkMinutes;
var seconds = initialWorkSeconds;

// Pomodoro state
var workState = true;

// Current pomodoroCount
var pomodoroCount = 0;

// Maximum pomodoros
const maximumPomodoros = 4;

//Bool variable indicating timer status
var timerRunning = false;

// Minutes and seconds formatted in a string
var timeString;

//Instance of setInterval
var timerInstance;

//HTML IDs
var timer = document.getElementById("timer");
var pomodoroString = document.getElementById("pomodoroCount");

//Function to enable timer, bounded to HTML button start/pause
function enableTimer(){
    if (timerRunning == true){
        timerRunning = false;
        clearInterval(timerInstance);
    }
    else {
        timerRunning = true;
        timerInstance = setInterval(runTimer,1000);
    }
}

//Function to disable timer (reset), bounded to HTML button stop
function disableTimer(){
    clearInterval(timerInstance);
    resetTimer();
    resetPomodoroCount();
}

//Function to reset timer value to initial values (hardcoded in variable section)
function resetTimer(){
    setWorkTimer();
    timeString = (String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0'));
    timer.innerHTML = timeString;
    timerRunning = false;
}

//Function to increment time (time step) of a second
function runTimer(){
    timeCalculation();
    timeString = (String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0'));
    timer.innerHTML = timeString;
}

//Function to calculate time format (when 60 seconds passes, a minute has passed)
function timeCalculation(){
    if (seconds==0){
        //This means timer has ran out.
        if (minutes ==0){
            timeOver();
        }
        //This means it's time to decrement minutes and increment seconds back to 59.
        else {
            minutes = minutes-1;
            seconds = 59;
        }
    }
    //This means only seconds needs to be decremented.
    else {
        seconds = seconds - 1;
    }
}

function timeOver(){
    console.log("DING!");
    if (workState == true){
        if (pomodoroCount == maximumPomodoros-1){
            console.log("Time for a long break.")
            workState = false;
            setLongPauseTimer();
            updatePomodoroCount();
            
        }
        else {
            console.log("Time for a break.")
            workState = false;
            setPauseTimer();
            updatePomodoroCount();
        }
    }

    else if (workState == false){
        if (pomodoroCount == maximumPomodoros){
            console.log("Resetting everything");
            disableTimer();
        }
        else{
            console.log("Time to work.")
            workState = true;
            setWorkTimer();
        }
    }
}

function updatePomodoroCount(){
    if (pomodoroCount < maximumPomodoros){
        pomodoroCount = pomodoroCount + 1;
    }
    else {
        pomodoroCount = 0;
    }
    pomodoroString.innerHTML = "Count = " + pomodoroCount + "/" + maximumPomodoros;
}

function resetPomodoroCount(){
    pomodoroCount = 0;
    pomodoroString.innerHTML = "Count = " + pomodoroCount + "/" + maximumPomodoros;
}

function setPauseTimer(){
    minutes = initialPauseMinutes;
    seconds = initialPauseSeconds;
}

function setLongPauseTimer(){
    minutes = initialLongPauseMinutes;
    seconds = initialLongPauseSeconds;
}

function setWorkTimer(){
    minutes = initialWorkMinutes;
    seconds = initialWorkSeconds;
}

function loadVariables(){
    resetTimer();
    pomodoroString.innerHTML = "Count = " + pomodoroCount + "/" + maximumPomodoros;
}
