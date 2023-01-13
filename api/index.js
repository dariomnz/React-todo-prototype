const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");

const port = 8080;
// Connect to MongoDB database
mongoose
  .connect("mongodb://user:password@mongo:27017/database", {
    useNewUrlParser: true,
  })
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/api", routes);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  });
