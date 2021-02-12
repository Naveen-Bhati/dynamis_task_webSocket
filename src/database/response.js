const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const url = process.env.PROD_MONGODB_URL || process.env.DEV_MONGODB_URL;

mongoose
  .connect(url, {
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

const responseSchema = new mongoose.Schema([
  {
    client_id: String,
    name: String,
    responseMsg: String,
  },
]);

const Response = new mongoose.model("client_reply", responseSchema);

module.exports = Response;
