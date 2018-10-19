process.env.PORT = 8005;
process.env.MONGODB_URI = 'mongodb://<user>:<password>@ds135993.mlab.com:35993/<database>';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  LogSchema = new Schema({
    action: {type: String, default: 'click'},
    created: { type: Date, default: Date.now }
  });
var Log = mongoose.model('Log', LogSchema);

// SERVER SETUP
require('mahrio').runServer( process.env, __dirname )
  .then( function(server) {

    // TEST using Terminal command:
    // curl -X POST http://127.0.0.1:8005/button-click {}
    server.route({
      method: 'POST',
      path: '/button-click',
      handler: function(req, rep) {
        Log.create({}, function(err, log) {
          if( err ) { return rep({error: err}); }

          rep(log);
        });
      }
    });
    // curl -X GET http://127.0.0.1:8005/button-clicks
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
