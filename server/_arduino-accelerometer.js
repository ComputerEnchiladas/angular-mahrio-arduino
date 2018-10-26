var five = require("johnny-five"),
  board, accel;

board = new five.Board();

board.on("ready", function() {
  accel = new five.Accelerometer({
    pins: ["A2", "A1", "A0"]
  });
  accel.on("data", function (data) {
    console.log("raw: ", data);
  });
  accel.on("acceleration", function(data) {
    console.log("acceleration", data);
  });
  accel.on("orientation", function(data) {
    console.log("orientation", data);
  });
  accel.on("inclination", function(data) {
    console.log("inclination", data);
  });
  accel.on("change", function(data) {
    console.log("change", data);
  });
});
