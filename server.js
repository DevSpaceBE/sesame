(function main() {
  var express         = require('express');
  var passport        = require('passport')
  var TwitterStrategy = require('passport-twitter').Strategy;
  var Sesame          = require('./lib/sesame');
  var configuration   = require('./configuration');

  var assetDir  = __dirname + '/public';
  var app       = express.createServer();
  var logStream = process.stdout;
  var users     = {};

  passport.use(
    new TwitterStrategy(
      {
        consumerKey:    configuration.authentication.twitter.consumerKey,
        consumerSecret: configuration.authentication.twitter.consumerSecret,
        callbackURL:    buildUrlToPath("/session/new/callback")
      },
      function(token, tokenSecret, profile, done) {
        if (configuration.authentication.twitter.authorizedUsers.indexOf(profile.username) >= 0)
          done(null, profile);
        else
          done("You are not allowed to open Sesame, " + profile.username + ".");
      }
    )
  );

  passport.serializeUser(function(user, done) {
    users[user.id] = user;
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, users[id]);
  });

  app.configure(function() {
    app.use(express.logger({stream: logStream}));
    app.use(express.cookieParser());
    app.use(tokenForcer());
    app.use(express.session({key: "sesame", cookie: {maxAge: 360000000000}, secret: configuration.sessions.secret}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(assetDir));

    var sesame = new Sesame({device: configuration.serial.device});
    sesame.check(function(err) {
      if (err)
        logStream.write("⚠ " + err + "\n");
    });
  });

  app.get(/^\/(?:index\.html)?$/, function(req, res, next) {
    if (!req.user)
      res.redirect("/session/new");
    else
      next();
  });

  app.get('/open', function(req, res) {
    if (!req.user) {
      res.writeHead(401);
      res.end("Who are you exactly?");
    } else {
      var sesame = new Sesame({device: configuration.serial.device});
      sesame.open(function(err) {
        if (err) {
          res.writeHead(500);
          res.end("Could not open the gate :(");
        } else {
          res.writeHead(200);
          res.end("Opening the gate for you...");
        }
      });
    }
  });

  app.get(
    '/session/new',
    passport.authenticate('twitter')
  );

  app.get(
    '/session/new/callback',
    passport.authenticate('twitter', { successRedirect: '/',
                                       failureRedirect: '/error' })
  );

  app.get('/session/auth_token', function(req, res) {
    res.end("var sesameToken = '" + req.cookies.sesame + "';");
  });

  app.listen(configuration.server.port);
  logStream.write("✔ Accepting connections on port " + configuration.server.port + "...\n");

  function tokenForcer() {
    // This is a trick to allow persistent cookies in AJAX requests from
    // "home screen iOS web apps".
    return function(req, res, next) {
      req.cookies.sesame;
      var authToken = req.query.authToken;
      if (authToken)
        req.cookies.sesame = authToken;
      next();
    };
  };

  function buildUrlToPath(path) {
    return "http://" + configuration.server.host + ":" + configuration.server.port + path;
  };
})();