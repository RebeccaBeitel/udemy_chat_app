$(document).ready(function () {
  var socket = io();

  var room = $("#groupName").val();

  socket.on("connect", function () {
    console.log("Yay! User connected. ");

    var params = {
      room: room,
    };
    socket.emit("join", params, function () {
      console.log(`User has joined ${params.room} channel.`);
    });
  });

  socket.on("newMessage", function (data) {
    console.log(data.text);
    console.log(data.room);
  });

  $("message-form").on("submit", function (e) {
    e.preventDefault();

    var msg = $("#msg").val();
    console.log(msg);
    socket.emit(
      "createMessage",
      {
        text: msg,
        room: room,
      },
      function () {
        $("#msg").val("");
      }
    );
  });
});
