var INBOUND_DATA  = ">";
var OUTBOUND_DATA = "<";

var url        = require('url');
var connect    = require('connect');
var parsers    = require('serialport').parsers;
var SerialPort = require('serialport').SerialPort;

var port         = process.env.PORT || 2847;
var serialDevice = process.env.SERIAL_DEVICE || '/dev/tty-usbserial1';
var server       = connect.createServer();

server.use(function(req, res, next){
  var pathname = url.parse(req.url).pathname;
  var remote   = req.connection.remoteAddress;

  if (pathname == '/open') {
    log(remote, INBOUND_DATA, "open gate request");
    openGate(function(err) {
      if (err) {
        res.writeHead(500);
        res.end("Could not open the gate :(");
        log(req.connection.remoteAddress, OUTBOUND_DATA, "open gate failure (" + err + ")");
      } else {
        res.end("Opening the gate for you...");
        log(req.connection.remoteAddress, OUTBOUND_DATA, "open gate success");
      }
    });
  } else {
    if (pathname == '/')
      log(remote, INBOUND_DATA, "application load (static)");
    next();
  }
});
server.use(connect.static(__dirname));

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

function log(remote, dataDirection, message) {
  console.log(now() + ' - ' + remote + ' ' + dataDirection + ' ' + message);
};

function now(d) {
  function pad(n) { return n<10 ? '0' + n : n; }
  var d = new Date();
  return d.getFullYear() + '-' + pad(d.getMonth()) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}

init(function(err) {
  if (err)
    console.log("Warning: " + err + "\n");
  server.listen(port);
  console.log('Accepting connections on port '+port+'...');
});

