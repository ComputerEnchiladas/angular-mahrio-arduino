var five = require('johnny-five');
var board = five.Board();
var play;

board.on('ready', function () {
  var p = new five.Piezo(13);
  play = function(song) {
    p.play({
      song: [
        [song, 1 / 4]
      ],
      tempo: 100
    });
  };
});

process.env.PORT = 8004;
require('mahrio').runServer( process.env, __dirname).then( function(server){
  server.route({
    method: 'GET',
    path: '/key/{name}',
    handler: function( request, reply){
      if( play ) {
        play( request.params.name.replace('-','#') );
      }
      reply();
    }
  });
  server.route({
    method: 'GET',
    path: '/{any*}',
    handler: function(req, rep) {
      rep.file('piano.html');
    }
  })
});
