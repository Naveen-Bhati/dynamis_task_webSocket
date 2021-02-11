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
var n = 0;
var obj = [];
var ids = [];

io.on("connection", (socket) => {
  ids.push(socket.id);
  n += 1;
  console.log("total connected clients= ", n);
  socket.emit("Hello", "hello world");

  socket.on("response", (response) => {
    const ResponseReply = new Response({
      client_id: response.id,
      name: response.name,
      responseMsg: response.responseMsg,
    });
    // app.post("/response", (req, res) => {
    //   res.send("<h1>Response sent Successfully...</h1>");
    // });

    obj.push(ResponseReply);
    if (n == obj.length) {
      Response.insertMany(obj, function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully stored all responses!");
        }
      });
    }
    console.log("no of clients = " + n, "no of responses = " + obj.length);
  });

  socket.on("disconnect", () => {
    n -= 1;

    const index = ids.indexOf(socket.id);
    if (index > -1) {
      ids.splice(index, 1);
    }
    console.log("total connected clients= ", n);
  });
});

server.listen(port, () => {
  console.log(`listening on port no ${port}`);
});
