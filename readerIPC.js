/**
 * Updates controller driving intensities
 * @param {string[]} intensities
 */
const updateControllerIntensities = intensities => {
  const socket = connectToReader();
  socket.write(intensities.join(',') + ',HIGH,0');
};

/**
 * Connects to the reader's TCP socket
 * @returns the socket connection object
 */
const connectToReader = () => {
  // Reader's socket connection info
  const DRIVER_SOCKET_IP = '127.0.0.1';
  const DRIVER_SOCKET_PORT = 1337;

  const socket = new net.Socket();
  socket.connect(DRIVER_SOCKET_PORT, DRIVER_SOCKET_IP, () => {
    console.log('Connected To Socket');
  });

  return socket;
};
