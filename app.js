const express = require("express");
const moongoose = require("moongoose");

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


// connect to DB
moongoose.connect('mongodb+srv://cmcwebcode:cmcWebCode7@cluster0-kactq.mongodb.net/test', () => {
        console.log("connected to db")
    })
    // console.log("hello");

// How to we start listening to the sevrer
app.listen(3000);