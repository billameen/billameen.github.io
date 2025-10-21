import { animate } from 'animejs';

const wavesList = [
    '../img/svg/top-waves0', 
    '../img/svg/top-waves1', 
    '../img/svg/top-waves2', 
    '../img/svg/top-waves3', 
    '../img/svg/top-waves4', 
    '../img/svg/top-waves5', 
    '../img/svg/top-waves6', 
    '../img/svg/top-waves7', 
    '../img/svg/top-waves8', 
];

const currentTransition = document.getElementById('navbar-transition');


function changeTransition(idx) {
    currentTransition.attributes.data = wavesList[idx];
    console.log("transition");
}

let i = 0;
setInterval(changeTransition, 1000, (i++)%9);