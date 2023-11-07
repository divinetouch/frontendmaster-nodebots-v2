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

const board = await createBoard({ repl: true });

const rgb = new five.Led.RGB([10, 9, 8]);

rgb.on();
rgb.color('#FF0000');

board.repl.inject({
  rgb,
});

// Your code goes here!

server.listen(PORT, () => {
  console.log('🤖 Express and Johnny-Five are up and running.');
  startClientServer();
});
