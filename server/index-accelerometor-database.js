var five = require("johnny-five"), orientation, alarm = Date.now(), io,
  ready, accel, board = new five.Board();

board.on("ready", function() {
  accel = new five.Accelerometer({
    pins: ["A2", "A1", "A0"]
  });
  accel.on("orientation", function(data) {
    orientation = data;
    io.sockets.emit('event:orientation', data);
  });
});

setInterval(function() {
  var dir;
  switch( orientation ) {
    case -1:
      dir = 'Up';
      break;
    case -2:
      dir = 'Left';
      break;
    case -3:
      dir = 'Right';
      break;
  }
  if( ready ) {
    Log.create({action: 'orientation', value: dir}, function() {
      console.log("orientation", dir);
    });
    if( dir !== 'Up') {
      // send text message
      if( Date.now() - alarm > (1000 * 60 * 5) ) {
        alarm = Date.now();
        // SEND TEXT MESSAGE WITH DIRECTION
      }
    }
  }
}, 5000);

process.env.PORT = 8005;
process.env.NODE_URL = '10.251.13.113';
process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/development';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  LogSchema = new Schema({
    action: {type: String, default: 'click'},
    value: {type: String, default: ''},
    created: { type: Date, default: Date.now }
  });
var Log = mongoose.model('Log', LogSchema);

// SERVER SETUP
require('mahrio').runServer( process.env, __dirname )
  .then( function(server) {
    ready = true;
    io = require('socket.io').listen( server.listener );
    server.route({
      method: 'GET',
      path: '/button-clicks',
      handler: function(req, rep) {
        Log.find({}, function(err, logs) {
          if( err ) { return rep({error: err}); }

          rep({logs: logs});
        })
      }
    })
  });

