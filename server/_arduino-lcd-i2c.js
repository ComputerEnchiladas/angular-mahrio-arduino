var five = require("johnny-five");
var board = new five.Board(), timer = 15;

board.on("ready", function() {
  var random = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 4).toUpperCase();

  var l = new five.LCD({
    controller: "PCF8574T"
  });

  setInterval( function(){
    if( timer ) {
      l.cursor(0, 0).print("00:" + timer--);
    } else {
      // alert
    }
  }, 1000);
});
