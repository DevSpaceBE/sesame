(function main() {
  var Sesame  = require('./lib/sesame-pi');
  var express = require('express');

  var assetDir  = __dirname + '/public';
  var port      = process.env.PORT || 2847;
  var app       = express();
  var logStream = process.stdout;

  app.configure(function () {
    app.use(express.logger({stream: logStream}));
    app.use(app.router);
    app.use(express.static(assetDir));

    var sesame = new Sesame();

    sesame.check(function (err) {
      if (err)
        logStream.write("⚠ " + err + "\n");
    });
  });

  app.post('/open', function (req, res) {
    var sesame = new Sesame();

    sesame.open(function (err) {
      if (err) {
        logStream.write("⚠ " + err + "\n");
        res.send(500, "Could not open the gate :(");
      } else {
        res.send(200, "Opening the gate for you...");
      }
    });
  });

  app.listen(port);
  logStream.write("✔ Accepting connections on port " + port + "...\n");
})();
