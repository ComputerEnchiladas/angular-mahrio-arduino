var five = require('johnny-five');
var board = five.Board();
var blue_button1, red_button2;

var accountSid = '?????';
var authToken = '?????';
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

var sendMessage = function( msg ) {
  client.messages.create({
    body: msg,
    to: '+1xxxXXXxxxx',  // Text this number
    from: '+1xxxXXXxxxx' // From a valid Twilio number
  }).then(function(message){
    console.log(message.sid);
    console.log('message sent');
  }, function(err) {
    console.log(err);
  });
};
board.on('ready', function () {
  blue_button1 = new five.Button({
    pin: 2,
    isPullup: true,
    holdtime: 5000
  });
  red_button2 = new five.Button({
    pin: 4,
    isPullup: true,
    holdtime: 5000
  });
  blue_button1.on('hold', function() {
    sendMessage( 'Blue Button Memo' );
  });

  red_button2.on('hold', function() {
    sendMessage( 'Red Button Memo' );
  });
});
