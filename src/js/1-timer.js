'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const iziToastOptions = {
  message: 'Please choose a date in the future',
  icon: 'material-icons',
  iconText: 'highlight_off',
  iconColor: '#fff',
  backgroundColor: '#ef4040',
  messageColor: '#fff',
  messageSize: '16px',
  maxWidth: '302px',
  close: false,
  position: 'topRight',
  progressBar: false,
  layout: 2,
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const curDate = new Date();

    if (selectedDates[0].getTime() < curDate.getTime()) {
      iziToast.show(iziToastOptions);
      startBtnElem.disabled = true;
    } else {
      userSelectedDate = selectedDates[0].getTime();
      startBtnElem.disabled = false;
    }
  },
};

const fp = flatpickr('#datetime-picker', options);
const startBtnElem = document.querySelector('.input-btn button');
const datePickerElem = document.querySelector('.input-btn input');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
let countDownIntervalId = 0;
let userSelectedDate = 0;

startBtnElem.disabled = true;
datePickerElem.disabled = false;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function countDownStart(evnt) {
  startBtnElem.disabled = true;
  datePickerElem.disabled = true;
  countDownIntervalId = setInterval(countDown, 1000, userSelectedDate);
}

function countDown(fromDate) {
  const diff = fromDate - new Date().getTime();
  const current = convertMs(diff);
  if (diff > 1000) {
    updateTimerDisplay(current);
  } else {
    updateTimerDisplay(current);
    clearInterval(countDownIntervalId);
    datePickerElem.disabled = false;
  }
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysValue.textContent = String(days).padStart(2, '0');
  hoursValue.textContent = String(hours).padStart(2, '0');
  minutesValue.textContent = String(minutes).padStart(2, '0');
  secondsValue.textContent = String(seconds).padStart(2, '0');
}

startBtnElem.addEventListener('click', countDownStart);
