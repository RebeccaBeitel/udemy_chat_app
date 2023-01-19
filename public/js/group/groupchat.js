$(document).ready(function () {
  let socket = io();

  let room = $("#groupName").val();

  socket.on("connect", function () {
    console.log("Yay! User connected. ");

    let params = {
      room: room,
    };
    socket.emit("join", params, function () {
      console.log("User has joined this channel.");
    });
  });

  socket.on("createMessage", function (data) {
    console.log(data.text);
    console.log(data.room);
  });

  $("message-form").on("submit", function (e) {
    e.preventDefault();

    let msg = $("#msg").val();

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
