const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const connection_string =
  process.env.NODE_ENV === "production"
    ? "mongodb://root:root@db:27017/WarScape"
    : "mongodb://localhost:27017/WarScape";

mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
  })
  .then(() => {
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use("/", routes);

    app.listen(5000);
  });
