var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var random = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 4).toUpperCase();

  var l = new five.LCD({
    controller: "PCF8574T"
  });

  l.useChar("heart");
  l.cursor(0, 0).print("hello :heart:");
});
