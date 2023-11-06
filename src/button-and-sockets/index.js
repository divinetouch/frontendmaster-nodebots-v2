import http from 'http';
import bodyParser from 'body-parser';
import five from 'johnny-five';
import express from 'express';
import { Server } from 'socket.io';
import createBoard from '../utilities/create-board.js';
import { startClientServer } from '../utilities/client-server.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

await createBoard({ repl: false });

// Add in server-side socket.io code here.
const button = new five.Button(2);

io.on('connection', (socket) => {
  console.log('🔌 Socket connection established.');

  button.on('down', () => {
    socket.emit('button', 'down');
  });

  button.on('up', () => {
    socket.emit('button', 'up');
  });
});

server.listen(PORT, () => {
  console.log('🤖 Express and Johnny-Five are up and running.');
  startClientServer();
});
