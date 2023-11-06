import five from 'johnny-five';

const board = new five.Board();

board.on('ready', () => {
  // const led = new five.Led(13);
  // led.blink(1000);

  const led = new five.Led(11);
  led.pulse(500);

  // put it in scope of the repl
  board.repl.inject({
    led,
  });
});
