'use strict';
exports.__esModule = true;
var child_process_1 = require('child_process');
var path = require('path');
var net = require('net');

// CHANGE THIS FOR TESTING DIFFERENT DURATIONS
const DURATION_IN_MINUTES = 15;
const SAMPLING_RATE = 100;
const TOTAL_SAMPLES = SAMPLING_RATE * 60 * DURATION_IN_MINUTES; // The number of total samples to check and count

let readerName;

// Ask which benchmark the user wants
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Reader Version? Can be "old" or "new" only!', version => {
  readerName = `${version.toUpperCase()}Test1`;
  console.log('Spawned Reader: ' + readerName);
  console.log('Reading data, please wait for completion');
  startReader();
  readline.close();
});

/**
 * Starts the reader
 */
const startReader = () => {
  // Spawn reader
  var v5Reader = (0, child_process_1.spawn)(path.join(__dirname, 'reader', readerName + '.exe'));

  const dataPointsPerRead = 10; // Each read contains 10 samples

  // Counters
  let dataPointsCount = 0;
  let firstCount = 0;

  // Time variables
  let time1;
  let time2;

  // Listen for reader's data on stdout channel
  v5Reader.stdout.on('data', function (chunk) {
    // On the first read, save the time
    if (firstCount === 0) {
      time1 = process.hrtime.bigint();
      firstCount = 1;
    }

    dataPointsCount += dataPointsPerRead;

    // When the `dataPointsCount` count equals the total number of samples specified
    // get the current time and calculate the total duration. From the duration
    // and the total number of samples, we can determine the accuracy of sampling
    // rate up to an acceptable precision.
    if (dataPointsCount === TOTAL_SAMPLES) {
      time2 = process.hrtime.bigint();
      console.log(
        'TIME TAKEN FOR ' + TOTAL_SAMPLES + `${readerName.toLocaleLowerCase().includes('OLD') ? 'OLD' : 'NEW'} READER`,
      );
      console.log(time2 - time1);
      process.exit();
    }
  });

  // Listen for stderr - Info is written in that channel
  v5Reader.stderr.on('data', chunk => {
    console.log(chunk.toString());
  });
};
