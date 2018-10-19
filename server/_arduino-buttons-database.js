var five = require('johnny-five');
var board = five.Board();
var blue_button1, red_button2, ready;

board.on('ready', function () {
  blue_button1 = new five.Button({
    pin: 2,
    isPullup: true
  });
  red_button2 = new five.Button({
    pin: 4,
    isPullup: true
  });
  blue_button1.on('press', function() {
    if( ready ) {
      Log.create({action: 'blue'}, function(err, log) {
        if( !err && log ) {
          console.log('blue click logged');
        }
      });
    }
  });

  red_button2.on('press', function() {
    if( ready ) {
      Log.create({action: 'red'}, function(err, log) {
        if( !err && log ) {
          console.log('red click logged');
        }
      });
    }
  });
});

process.env.PORT = 8005;
process.env.MONGODB_URI = 'mongodb://<user>:<password>@ds135993.mlab.com:35993/<database>';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  LogSchema = new Schema({
    action: {type: String, default: 'click'},
    created: { type: Date, default: Date.now }
  });
var Log = mongoose.model('Log', LogSchema);

require('mahrio').runServer( process.env, __dirname )
  .then( function() {
    ready = true;
  });
