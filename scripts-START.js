let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + (seconds * 1000);
  dispalyTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if its time to stop it
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }


    dispalyTimeLeft(secondsLeft);
  }, 1000);
}

function dispalyTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSecs = seconds % 60;
  const display = `${minutes}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  timerDisplay.textContent = display;
  document.title = display;
  console.log({ minutes, remainderSecs });
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
  //  that is for US  &  Canada etc -  for us europeans we can just leave it with :
  //  endTime.textContent = `Be Back At ${hour}:${minutes}`;
}

function startTimer() {
  console.log(this.dataset);
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});