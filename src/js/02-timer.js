import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  days: document.querySelector("span[data-days]"),
  hours: document.querySelector("span[data-hours]"),
  minutes: document.querySelector("span[data-minutes]"),
  seconds: document.querySelector("span[data-seconds]"),
  startBtn: document.querySelector("button[data-start]"),
  picker: document.getElementById('datetime-picker'),
};

let timerId = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Report.warning("Please choose a date in the future");
        }
        else { 
          refs.startBtn.disabled = false;
        }
  },
};

flatpickr(refs.picker, options);

refs.startBtn.addEventListener('click', startBtn);

function startBtn() { 
  
  timerId = setInterval(() => {
   const countdown = new Date(refs.picker.value) - new Date();
    if (countdown >= 0) {
      let arr = convertMs(countdown);
      refs.picker.disabled = true;
      refs.days.textContent = arr.days < 10 ? addLeadingZero(arr.days) : arr.days;
      refs.hours.textContent = arr.hours < 10 ? addLeadingZero(arr.hours) : arr.hours;
      refs.minutes.textContent = arr.minutes < 10 ? addLeadingZero(arr.minutes) : arr.minutes;
      refs.seconds.textContent = arr.seconds < 10 ? addLeadingZero(arr.seconds) :  arr.seconds;
    }
    else {
      Notiflix.Report.info('Time end');
      clearInterval(timerId);
    }
  }, 1000);

};

function convertMs(ms) {
  
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
    const days = Math.floor(ms / day);
    console.log(days);
  // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    console.log(hours);
  // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    console.log(minutes);
  // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    console.log(seconds);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {  
    return value.toString().padStart(2, "0");
  }

