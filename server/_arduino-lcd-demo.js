var five = require("johnny-five"),
  board = new five.Board(),
  messages = [{t: 'Hello', b: 'World'}, {t: 'Arduino', b: 'Rocks'}, {t: 'Johnny-Five', b: 'Awesome'}],
  index = 0,
  lcd;

board.on("ready", function() {
  // https://mahrio-medium.s3.amazonaws.com/communication-system-state-via-lcd.png
  lcd = new five.LCD({
    pins: [7, 8, 9, 10, 11, 12],
    rows: 2,
    cols: 20
  });
  this.loop(5000, function() {
    lcd.clear().cursor(0, 0).print( messages[index].t );
    lcd.cursor(1, 0).print( messages[index].b );

    if(index == 2){
      index = 0;
    } else {
      index += 1;
    }
  });
});
