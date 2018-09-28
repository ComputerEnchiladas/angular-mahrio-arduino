
// JOHNNY-FIVE
var five = require('johnny-five'),
  board = new five.Board();

// SERVER
var io;

// HARDWARE
var button, led;

// HARDWARE SETUP
board.on('ready', function() {
  button = new five.Button({
    pin: 2,
    isPullup: true, // default false
    holdtime: 2000  // default 500ms
  });

  button.on('press', function(){

  });
  button.on('hold', function() {

  });
});
process.env.PORT = 8000;
// SERVER SETUP
require('mahrio').runServer( process.env, __dirname )
  .then( function(server) {
    io = require('socket.io').listen( server.listener );

    server.route({
      method: 'GET',
      path: '/hello',
      handler: function(req, rep) {
        rep('Hello World');
      }
    })
  });
