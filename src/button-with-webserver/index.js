import five from 'johnny-five';
import express from 'express';
import createBoard from '../utilities/create-board.js';
import { startClientServer } from '../utilities/client-server.js';

const app = express();
const { PORT = 3000 } = process.env;

await createBoard({ repl: false });

let isPressed = false;

const button = new five.Button({ pin: 2 });
const led = new five.Led(11);
button.on('press', () => (isPressed = true));
button.on('up', () => (isPressed = false));

app.get('/', (req, res) => {
  led.toggle();
  res.send(`The button is ${isPressed ? 'pressed' : 'not pressed'}`);
});

app.listen(PORT, () => {
  console.log(
    '👻 Your server is up and running on Port ' + PORT + '. Right on!',
  );
  startClientServer();
});
