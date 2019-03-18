let socketIo = require("socket.io");

module.exports = class SocketIoController {
  constructor(server) {
    this.io = socketIo(server);
  }
};
