# Check Device Sampling rate - V5 ONLY

Checks device sampling rate and outputs the time it takes to read 100 samples.

## How to Run the Benchmark

1.  Install NodeJS
2.  Navigate to the script's folder
3.  Run `npm install` to install the dependencies
4.  Run `node main.js` to run the script
5.  Choose between "old" or "new" version
6.  Wait for the script to execute and you will see the time taken printed to the console in nanoseconds as BigInt type.
7.  Compare the printed time to the theoretical time (based on the total samples defined) to figure out the error in sampling rate.
