var five = require("johnny-five");
var pixel = require("node-pixel");
// FLASH ARDUINO WITH node_pixel_firmata
// node-pixel/firmware/build/node_pixel_firmata/node_pixel_firmata.ino
// https://github.com/ajfisher/node-pixel

var board = new five.Board();
var strip = null, stripReady, red = 3, blue = 5, green = 6;

board.on("ready", function() {

  console.log("Board ready, lets add light");
  strip = new pixel.Strip({
    data: 9,
    length: 5,
    color_order: pixel.COLOR_ORDER.GRB,
    board: this,
    controller: "FIRMATA"
  });

  strip.on("ready", function() {
    stripReady = true;
  });

  this.repl.inject({
    strip: strip
  });
});


process.env.PORT = 8002;
require('mahrio').runServer(process.env, __dirname )
  .then( function(server) {
    server.route({
      method: 'POST',
      path: '/neopixel/color',
      handler: function(req, rep){
        var c = req.payload;
        if( stripReady ) {
          if( c.pos ) { console.log(c);
            strip.pixel( Number(c.pos) ).color('rgb(' + c.red + ',' + c.green + ',' + c.blue + ')');
            strip.show();
          } else {
            strip.color('rgb(' + c.red + ',' + c.green + ',' + c.blue + ')');
            strip.show();
          }
        }
        console.log('rgb('+c.red+','+c.green+','+c.blue+')');
        rep();
      }
    });
  });
