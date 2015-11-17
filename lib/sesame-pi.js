var gpio = require("pi-gpio");

var gpioPin = 7; // header pin 7 = GPIO port 4
var duration = 1500; // in ms

var Sesame = function () {};

Sesame.prototype.check = function (callback) {
  gpio.open(gpioPin, "output", function (err) {
    gpio.close(gpioPin, function (err) {
      callback(new Error("Cannot open and/or close pin "+gpioPin+" for output"));
    });
  });
};

Sesame.prototype.open = function (callback) {
  var off = 0;

  gpio.read(gpioPin, function (err, value) {
    if (err) callback(err);
    off = value;
  });

  var on = (1 - off) % 2;
  // open pin 7 for output
  gpio.open(gpioPin, "output", function (err) {
    if (err) callback(err);
    console.log('GPIO pin '+gpioPin+' is open.');
    gpio.write(gpioPin, on, function (err) {
      if (err) callback(err);
      console.log('Sending on to pin '+gpioPin+'.');
    });
  });

  setTimeout(function () {
    gpio.write(gpioPin, off, function (err) {
      if (err) callback(err);
      console.log('Sending off to pin '+gpioPin+' and closing.');
      // then close pin 7
      gpio.close(gpioPin, function (err) {
        callback(err);
      });
    });
  }, duration);
};

module.exports = Sesame;
