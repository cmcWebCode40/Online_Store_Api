const express = require("express");

const app = express();

// //Middlewares
// app.use("/posts", () => {
//   console.log("this a middleawre");
// });

// Routes
app.get("/", (req, res) => {
  res.send("welcome");
});

app.get("/posts", (req, res) => {
  res.send("welcome to post page");
});

// How to we start listening to the sevrer
app.listen(3000);
