let socketIo = require("socket.io");

module.exports = class SocketIoController {
  constructor(server) {
    this.io = socketIo(server);
    this.listenToSocketConnections();
    this.prebookingSeatsByView = {};
  }

  listenToSocketConnections() {
    // listener for new connections
    this.io.on("connection", socket => {
      // socket is the connection to ONE client
      console.log("a new client connected");

      // let the socket listen to custom events
      socket.on("booking", msg => {
        console.log("hey", msg);
        // send the incoming message back to ALL
        // clients (all connected sockets)
        this.io.emit("booking", msg);
      });

      // socket.on("prebooking", msg => {
      //   console.log("hey", msg);
      //   if (!this.prebookingSeatsByView[msg.viewId]) {
      //     this.prebookingSeatsByView[msg.viewId] = [];
      //   }
      //   this.prebookingSeatsByView[msg.viewId] = this.prebookingSeatsByView[
      //     msg.viewId
      //   ].concat(msg.socketseats);
      //   // send the incoming message back to ALL
      //   // clients (all connected sockets)
      //   this.io.emit("prebooking", {
      //     viewId: msg.viewId,
      //     socketseats: this.prebookingSeatsByView[msg.viewId]
      //   });
      // });
    });
  }
};
