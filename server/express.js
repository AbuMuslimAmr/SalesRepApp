var mocks = require('./mocks');

var Server = {
  run: function () {
    var express = require('express'),
        conf = require('./conf'),
        app = express();

    // index
    app.use(express.static(__dirname + conf.app));
    app.get('/', function(req, res) {
      res.sendFile(conf.index, {root: __dirname});
    });

    mocks.init(app);

    var server = app.listen(conf.port, function () {
      var host = server.address().address;
      var port = server.address().port;

      console.log('App is up and running on http://%s:%s', host, port);
    });

    return server;
  }
};

module.exports = Server;