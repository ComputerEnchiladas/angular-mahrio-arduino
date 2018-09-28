var five = require("johnny-five"),
  board = new five.Board(),
  boardReady,
  lcd;

board.on("ready", function() {
  // https://mahrio-medium.s3.amazonaws.com/communication-system-state-via-lcd.png
  lcd = new five.LCD({
    pins: [7, 8, 9, 10, 11, 12],
    rows: 2,
    cols: 20
  });
  boardReady = true;
});

process.env.PORT = 8003;
require('mahrio').runServer(process.env, __dirname )
  .then( function(server) {
    server.route({
      method: 'POST',
      path: '/lcd',
      handler: function(req, rep){
        lcd.clear();
        lcd.cursor(0, 0).print( req.payload.top );
        lcd.cursor(1, 0).print( req.payload.bottom );
        console.log('LCD Message: ', req.payload);
        rep();
      }
    });
  });
