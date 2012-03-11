var SerialPort = require('serialport').SerialPort;
var serialDevice = process.env.SERIAL_DEVICE || '/dev/tty-usbserial1';

var Sesame = function() { };

Sesame.prototype.check = function(callback) {
  this.getSerialPort(callback);
};

Sesame.prototype.getSerialPort = function (callback) {
  var serialPort;

  var error = void(0);
  try {
    serialPort = new SerialPort(serialDevice, {baudrate: 9600});
  } catch (err) {
    error = "Could not open serial port on " + serialDevice;
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