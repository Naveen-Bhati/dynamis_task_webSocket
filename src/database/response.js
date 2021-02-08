const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/client_replies", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connection was successsful");
  })
  .catch((err) => {
    console.log(err);
  });

const responseSchema = new mongoose.Schema({
  client_id: String,
  name: String,
  responseMsg: String,
});

const Response = new mongoose.model("client_reply", responseSchema);

module.exports = Response;
