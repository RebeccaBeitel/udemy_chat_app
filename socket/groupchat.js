module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("join", (params, callback) => {
      socket.join(params.room);
      console.log(`User connected to ${params.room} room.`);
      callback();
    });

    socket.on("createMessage", (message, callback) => {
      io.to(message.room).emit("newMessage", {
        text: message.text,
        room: message.room,
      });

      callback();
    });
  });
};
