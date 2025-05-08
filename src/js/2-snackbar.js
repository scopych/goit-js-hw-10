'use strict';

const form = document.querySelector('form');
form.addEventListener('submit', submit);

function submit (event) {
    event.preventDefault();
    console.log('Works');
}

function makePromise (ms) {
    return myPromise = new Promise((resolve, reject) => {
        setTimeout(alert(
    
