var gpio = require("pi-gpio");

var durationId = 1; 
var gpioPin = 7;    // header pin 7 = GPIO port 4

var Sesame = function() { };

// Sesame.prototype.check = function(callback) {
//   this.getSerialPort(callback);
// };

// Sesame.prototype.getSerialPort = function (callback) {
//   var serialPort;

//   var error = void(0);
//   try {
//     serialPort = new SerialPort(serialDevice, {baudrate: 9600});
//   } catch (err) {
//     error = "Could not open serial port on " + serialDevice;
//   }
//   callback(error, serialPort);
// };

Sesame.prototype.check = function (callback) {
  callback();
};

Sesame.prototype.open = function (callback) {
  var duration = 1500; // in ms
  var off = 0;
  gpio.read(gpioPin, function(value, err) {
    if(err) throw err;
    off = value;
  });
  var on = (1 - on) % 2;
  // open pin 16 for output // 
  gpio.open(gpioPin, "output", function(err) {  
    if(err) callback(err);
  console.log('GPIO pin '+gpioPin+' is open.');
  gpio.write(gpioPin, on, function(err) {
    if(err) callback(err);
    console.log('Sending on to pin '+gpioPin+'.');
  });
});
setTimeout(function() {
  gpio.write(gpioPin, off, 
    function(err) {
      if(err) throw err;
      console.log('sending off to pin '+gpioPin+' and closing.');
      gpio.close(gpioPin);  // then Close pin 16 
      callback();
    }
  ); 
}, duration);
};
module.exports = Sesame;
