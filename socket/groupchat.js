module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("join", (params, callback) => {
      socket.join(params.room);
      callback();
    });

    socket.on("createMessage", (message) => {
      console.log(message);
      io.to(msg.room).emit("newMessage", {
        text: msg.text,
        room: msg.room,
      });
    });
  });
};
