'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
form.addEventListener('submit', submit);

let rdo = '';
let ms = 0;
const radioButtons = document.querySelectorAll('input[name="state"]');
radioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', function () {
    // Attach a 'change' event listener to each button
    if (this.checked) {
      rdo = this.value;
    }
  });
});

const delayInputElem = document.querySelector('input[name="delay"]');
delayInputElem.addEventListener('input', () => {
  ms = delayInputElem.value;
});

function submit(event) {
  event.preventDefault();
  makePromise(ms, rdo)
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'OK',
        message: ` Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
}

function makePromise(ms, rdo) {
  return new Promise((resolve, reject) => {
    if (rdo === 'fulfilled') {
      setTimeout(resolve, ms, ms);
    } else if (rdo === 'rejected') {
      setTimeout(reject, ms, ms);
    }
  });
}
