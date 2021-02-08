const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const http = require("http");
const Response = require("./database/response");

const app = express();
const server = http.createServer(app);

const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath));
const port = process.env.port || 8000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const io = socketio(server);

io.on("connection", (socket) => {
  socket.emit("Hello", "hello world");

  socket.on("response", (response) => {
    console.log(response.name);

    const ResponseReply = new Response({
      client_id: response.id,
      name: response.name,
      responseMsg: response.responseMsg,
    });
    console.log(ResponseReply);
    ResponseReply.save().then(() => {});
  });
});

server.listen(port, () => {
  console.log(`listening on port no ${port}`);
});
