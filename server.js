var url        = require('url');
var express    = require('express');
var parsers    = require('serialport').parsers;
var SerialPort = require('serialport').SerialPort;

var port         = process.env.PORT || 2847;
var serialDevice = process.env.SERIAL_DEVICE || '/dev/tty-usbserial1';
var app          = express.createServer();

app.configure(function() {
  app.use(express.logger());
  app.use(app.router);
  app.use(express.static(__dirname));
});

app.get('/open', function(req, res) {
  openGate(function(err) {
    if (err) {
      res.writeHead(500);
      res.end("Could not open the gate :(");
    } else {
      res.writeHead(200);
      res.end("Opening the gate for you...");
    }
  });
});


/////////////////////

function init(callback) {
  getSerialPort(callback);
}

function getSerialPort(callback) {
  var serialPort;

  var error = void(0);
  try {
    serialPort = new SerialPort(serialDevice, {baudrate: 9600});
  } catch (err) {
    error = "Could not open serial port on " + serialDevice;
  }
  callback(error, serialPort);
};

function openGate(callback) {
  var serialPort = getSerialPort(function(err, serialPort) {
    if (err) {
      callback(err);
    } else {
      serialPort.write('1');
      serialPort.close();
      callback();
    }
  });
};

init(function(err) {
  if (err)
    console.log("Warning: " + err + "\n");
  app.listen(port);
  console.log('Accepting connections on port '+port+'...');
});

