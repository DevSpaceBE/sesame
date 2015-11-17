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
  var off = 0;

  gpio.read(gpioPin, function (err, value) {
    if (err) return callback(err);
    off = value;
  });

  var on = (1 - off) % 2;

  gpio.open(gpioPin, "output", function (err) {
    if (err) return callback(err);
    console.log('GPIO pin '+gpioPin+' is open.');
    gpio.write(gpioPin, on, function (err) {
      if (err) {
        gpio.close(gpioPin);
        return callback(err);
      }
      console.log('Sending on to pin '+gpioPin+'.');
    });

    setTimeout(function () {
      gpio.write(gpioPin, off, function (err) {
        console.log('Sending off to pin '+gpioPin+' and closing.');
        gpio.close(gpioPin);
        callback(err);
      });
    }, duration);
  });
};

module.exports = Sesame;
