import five from 'johnny-five';
import createBoard from '../utilities/create-board.js';
import system from 'systeminformation';

const board = await createBoard();

const lcd = new five.LCD({
  pins: [7, 8, 9, 10, 11, 12],
  rows: 2,
  cols: 16,
});

board.repl.inject({ lcd });

// lcd.cursor(0, 0).print('Hello');
// lcd.cursor(1, 3).print('World!');

setInterval(async () => {
  const memory = await system.mem();
  const battery = await system.battery();

  lcd.cursor(0, 0).print(`Battery: ${battery.percent} %`);
  lcd
    .cursor(1, 0)
    .print(`Memory: ${Math.round(memory.available / 1024 / 1024)} MB`);
}, 1000);
