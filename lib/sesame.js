var SerialPort = require('serialport').SerialPort;

var Sesame = function(options) {
  options = options || {};
  if (!options.device)
    throw new Error("No device specified");
  this.device = options.device;
};

Sesame.prototype.check = function(callback) {
  this.getSerialPort(callback);
};

Sesame.prototype.getSerialPort = function (callback) {
  var serialPort;

  var error = void(0);
  try {
    serialPort = new SerialPort(this.device, {baudrate: 9600});
  } catch (err) {
    error = "Could not open serial port on " + this.device;
  }
  callback(error, serialPort);
};

Sesame.prototype.open = function (callback) {
  var serialPort = this.getSerialPort(function(err, serialPort) {
    if (err) {
      callback(err);
    } else {
      serialPort.write('1');
      serialPort.close();
      callback();
    }
  });
};
module.exports = Sesame;