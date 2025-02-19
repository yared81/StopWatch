// Stopwatch Logic
let stopwatch = {
    startTime: 0,
    elapsedTime: 0,
    timerInterval: null,
    isRunning: false,
    laps: [],
  };
  
  const stopwatchDisplay = document.querySelector('#stopwatch .display');
  const startStopButton = document.getElementById('startStop');
  const lapButton = document.getElementById('lap');
  const resetButton = document.getElementById('reset');
  const lapList = document.getElementById('lapList');
  
  function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor((milliseconds % 3600000) / 60000);
    let seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  function updateStopwatchDisplay() {
    stopwatchDisplay.textContent = formatTime(stopwatch.elapsedTime);
  }
  
  function startStop() {
    if (stopwatch.isRunning) {
      clearInterval(stopwatch.timerInterval);
      stopwatch.isRunning = false;
      startStopButton.textContent = 'Start';
    } else {
      stopwatch.startTime = Date.now() - stopwatch.elapsedTime;
      stopwatch.timerInterval = setInterval(() => {
        stopwatch.elapsedTime = Date.now() - stopwatch.startTime;
        updateStopwatchDisplay();
      }, 10);
      stopwatch.isRunning = true;
      startStopButton.textContent = 'Stop';
    }
  }
  
  function lap() {
    if (stopwatch.isRunning) {
      stopwatch.laps.push(stopwatch.elapsedTime);
      const lapItem = document.createElement('li');
      lapItem.textContent = `Lap ${stopwatch.laps.length}: ${formatTime(stopwatch.elapsedTime)}`;
      lapList.appendChild(lapItem);
    }
  }
  
  function resetStopwatch() {
    clearInterval(stopwatch.timerInterval);
    stopwatch.isRunning = false;
    stopwatch.elapsedTime = 0;
    stopwatch.laps = [];
    updateStopwatchDisplay();
    lapList.innerHTML = '';
    startStopButton.textContent = 'Start';
  }
  
  startStopButton.addEventListener('click', startStop);
  lapButton.addEventListener('click', lap);
  resetButton.addEventListener('click', resetStopwatch);
  
  // Timer Logic
  let timer = {
    timeLeft: 0,
    timerInterval: null,
    isRunning: false,
  };
  
  const timerDisplay = document.querySelector('#timer .display');
  const minutesInput = document.getElementById('minutes');
  const secondsInput = document.getElementById('seconds');
  const startTimerButton = document.getElementById('startTimer');
  const stopTimerButton = document.getElementById('stopTimer');
  const resetTimerButton = document.getElementById('resetTimer');
  
  function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timer.timeLeft);
  }
  
  function startTimer() {
    if (!timer.isRunning) {
      const minutes = parseInt(minutesInput.value) || 0;
      const seconds = parseInt(secondsInput.value) || 0;
      timer.timeLeft = (minutes * 60000) + (seconds * 1000);
  
      if (timer.timeLeft > 0) {
        timer.timerInterval = setInterval(() => {
          if (timer.timeLeft > 0) {
            timer.timeLeft -= 10;
            updateTimerDisplay();
          } else {
            clearInterval(timer.timerInterval);
            timer.isRunning = false;
            alert('Timer finished!');
          }
        }, 10);
        timer.isRunning = true;
      }
    }
  }
  
  function stopTimer() {
    clearInterval(timer.timerInterval);
    timer.isRunning = false;
  }
  
  function resetTimer() {
    clearInterval(timer.timerInterval);
    timer.timeLeft = 0;
    timer.isRunning = false;
    updateTimerDisplay();
    minutesInput.value = '';
    secondsInput.value = '';
  }
  
  startTimerButton.addEventListener('click', startTimer);
  stopTimerButton.addEventListener('click', stopTimer);
  resetTimerButton.addEventListener('click', resetTimer);
  
  // Tab Logic
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tab = button.getAttribute('data-tab');
  
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));
  
      button.classList.add('active');
      document.getElementById(tab).classList.add('active');
    });
  });