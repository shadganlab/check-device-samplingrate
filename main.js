'use strict';
exports.__esModule = true;
var child_process_1 = require('child_process');
var path = require('path');
var net = require('net');

// Spawn reader
const readerName = 'NEWTest1';
var v5Reader = (0, child_process_1.spawn)(path.join(__dirname, 'reader', readerName + '.exe'));

// Reader's socket connection info
const DRIVER_SOCKET_IP = '127.0.0.1';
const DRIVER_SOCKET_PORT = 1337;

let count = 0;
let t1 = process.hrtime.bigint();

// Listen for reader's data on stdout channel
v5Reader.stdout.on('data', function (chunk) {
  count++;

  // Reader outputs every 10 data points, so 10 * 10 = 100 samples
  if (count === 10) {
    const t2 = process.hrtime.bigint();
    console.log(t2 - t1);
    t1 = t2;
    count = 0;
  }
});

// Listen for stderr - Info is written in that channel
v5Reader.stderr.on('data', chunk => {
  console.log(chunk.toString());
});

// Check reader's IPC, needs a while to initialize
setTimeout(() => {
  const socket = new net.Socket();
  socket.connect(DRIVER_SOCKET_PORT, DRIVER_SOCKET_IP, () => {
    console.log('Connected To Socket');
  });

  socket.write('160,140,120,120,120,HIGH,0');
}, 1000);
