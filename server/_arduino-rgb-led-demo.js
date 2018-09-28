var five = require("johnny-five");
var board = new five.Board();
var rgb = [0,0,0], red = 3, green = 5, blue = 6, boardReady;

board.on("ready", function() {
  boardReady = this;
  this.pinMode(red, five.Pin.PWM);
  this.pinMode(green, five.Pin.PWM);
  this.pinMode(blue, five.Pin.PWM);

  var b = this;
  setInterval(function() {
    rgb = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
    b.analogWrite(red, rgb[0] ); // analogWrite( pin, value ) where value is from 0 - 255
    b.analogWrite(green, rgb[1] ); // analogWrite( pin, value ) where value is from 0 - 255
    b.analogWrite(blue, rgb[2] ); // analogWrite( pin, value ) where value is from 0 - 255
    console.log('rgb('+rgb.join(',')+')')
  }, 1000);
});
