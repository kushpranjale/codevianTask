const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const router = require("./router");
const path = require("path");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "./images")));
mongoose
  .connect(
    "mongodb+srv://lav:fL6ytZix7wPGBT58@cluster0-jltch.mongodb.net/image_db?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api", router);
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
