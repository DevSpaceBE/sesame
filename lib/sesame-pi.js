var gpio = require("pi-gpio");

var gpioPin = 7; // header pin 7 = GPIO port 4
var duration = 1500; // in ms

var Sesame = function () {};

Sesame.prototype.check = function (callback) {
  gpio.open(gpioPin, "output", function (err1) {
    gpio.close(gpioPin, function (err2) {
      callback(err1 || err2);
    });
  });
};

Sesame.prototype.open = function (callback) {
  var closeRelay = 0;
  var openRelay = 1;

  gpio.open(gpioPin, "output", function (err) {
    if (err) return callback(err);

    gpio.write(gpioPin, closeRelay, function (err) {
      if (err) {
        gpio.close(gpioPin);
        return callback(err);
      }

      setTimeout(function () {
        gpio.write(gpioPin, openRelay, function (err) {
          gpio.close(gpioPin);
          callback(err);
        });
      }, duration);
    });
  });
};

module.exports = Sesame;
