const express = require("express");

const app = express();

// Routes

app.get("/", (req, res) => {
  res.send("welcome");
});

// How to we start listening to the sevrer
