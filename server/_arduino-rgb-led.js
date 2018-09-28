var five = require("johnny-five");
var board = new five.Board();
var red = 3, green = 5, blue = 6, boardReady;

board.on("ready", function() {
  boardReady = this;
  this.pinMode(red, five.Pin.PWM);
  this.pinMode(green, five.Pin.PWM);
  this.pinMode(blue, five.Pin.PWM);

  this.analogWrite(red, 200 ); // analogWrite( pin, value ) where value is from 0 - 255
  this.analogWrite(green, 100 ); // analogWrite( pin, value ) where value is from 0 - 255
  this.analogWrite(blue, 0 ); // analogWrite( pin, value ) where value is from 0 - 255
});

process.env.PORT = 8001;
require('mahrio').runServer(process.env, __dirname )
  .then( function(server) {
    server.route({
      method: 'POST',
      path: '/rgb/color',
      handler: function(req, rep){
        var c = req.payload;
        if( boardReady ) {
          boardReady.analogWrite(red, c.red );
          boardReady.analogWrite(green, c.green );
          boardReady.analogWrite(blue, c.blue );
        }
        console.log('rgb('+c.red+','+c.green+','+c.blue+')');
        rep();
      }
    });
  });

