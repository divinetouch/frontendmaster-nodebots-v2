import { io } from 'socket.io-client';
import post from '../utilities/post';

const buttonState = document.querySelector('.button-state');

// Add in client-side socket.io code here.

const socket = io();

socket.on('connect', () => {
  console.log('We are set up on the client side');
});

socket.on('button', (message) => {
  console.log(message);
  buttonState.innerHTML = message;
});
