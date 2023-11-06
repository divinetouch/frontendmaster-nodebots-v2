import five from 'johnny-five';

const board = new five.Board();

board.on('ready', () => {
  const led = new five.Led(11);
  const button = new five.Button(2);

  // up, down, press, release
  // button.on('press', () => {
  //   console.log('Button pressed');
  // });

  button.on('down', () => {
    console.log('Button down');
    // led.on();
    led.fadeIn();
  });

  button.on('up', () => {
    console.log('Button up');
    // led.off();
    led.fadeOut();
  });

  board.repl.inject({
    led,
  });
});
