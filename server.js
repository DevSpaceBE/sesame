var url        = require('url');
var connect    = require('connect');
var parsers    = require('serialport').parsers;
var SerialPort = require('serialport').SerialPort;

var port         = process.env.PORT || 2847;
var serialDevice = process.env.SERIAL_DEVICE || '/dev/tty-usbserial1';
var server       = connect.createServer();

server.use(connect.static(__dirname));
server.use(function(req, res, next){
  var pathname = url.parse(req.url).pathname;
  if (pathname == '/open') {
    openGate(function(err) {
      if (err) {
        res.writeHead(500);
        res.end("Could not open the gate :(");
      } else {
        res.end("Opening the gate for you...");
      }
    });
  } else {
    next();
  }
})

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
  server.listen(port);
  console.log('Accepting connections on port '+port+'...');
});

