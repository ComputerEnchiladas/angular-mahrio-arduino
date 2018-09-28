var five = require("johnny-five");
var pixel = require("node-pixel");
// FLASH ARDUINO WITH node_pixel_firmata
// node-pixel/firmware/build/node_pixel_firmata/node_pixel_firmata.ino
// https://github.com/ajfisher/node-pixel

var board = new five.Board();
var strip = null, red = 3, blue = 5, green = 6;

var fps = 1; // how many frames per second do you want to try?

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

    console.log("Strip ready, let's go");

    var colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "white"];
    var current_pos = [0,1,2,3,4];

    current_pos.forEach(function(pos) {
      strip.pixel(pos).color(colors[pos]);
    });

    var blinker = setInterval(function() {

      strip.shift(1, pixel.FORWARD, true);

      strip.show();
    }, 1000/fps);
  });
});
