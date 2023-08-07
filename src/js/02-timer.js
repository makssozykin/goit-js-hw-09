// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
    start: document.querySelector("button[data-start]"),
};

refs.start.setAttribute("disabled", "");
let ms = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates.toLocaleString() >= options.defaultDate.toLocaleString()) {
            console.log(selectedDates[0]);
            refs.start.removeAttribute("disabled");
            ms = Date.parse(selectedDates) - Date.parse(options.defaultDate);
            console.log(`Differ: ${ms}`);
        }
        else { 
            window.alert("Please choose a date in the future");
        }
  },
};

const day = flatpickr("#datetime-picker", options);

refs.start.addEventListener('click', startBtn);

function startBtn() { 
    const arr = convertMs(ms);
    console.log(arr);
    refs.days.textContent = arr.days;
    refs.hours.textContent = arr.hours;
    refs.minutes.textContent = arr.minutes;
    refs.seconds.textContent = arr.seconds;
    setInterval(() => { 
        
    }, 1000)

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


