// import { animate } from 'animejs';
console.log("running js");
const wavesList = [
    './img/svg/top-waves0.svg', 
    './img/svg/top-waves1.svg', 
    './img/svg/top-waves2.svg', 
    './img/svg/top-waves3.svg', 
    './img/svg/top-waves4.svg', 
    './img/svg/top-waves5.svg', 
    './img/svg/top-waves6.svg', 
    './img/svg/top-waves7.svg', 
    './img/svg/top-waves8.svg', 
];

const currentTransition = document.getElementById('navbar-transition');


function changeTransition() {
    let idx = 9 * Math.random();
    currentTransition.setAttribute('data', wavesList[idx]);
    console.log("transition");
}

setInterval(changeTransition, 1000)