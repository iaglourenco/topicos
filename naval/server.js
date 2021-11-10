var express = require("express");
var game = require("./game");

var games = {};
const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/join", (req, res) => {
    res.sendFile(__dirname + "/join.html");
});
app.get("/create", (req, res) => {
    res.sendFile(__dirname + "/create.html");
});
app.get("/game/:gameId", (req, res) => {
    const id = req.params.gameId;

    if (games[id] === undefined) {
        res.sendFile(__dirname + "/404.html");
    } else {
        res.sendFile(__dirname + "/game.html");
        console.log(games[id]);
    }
});

app.post("/create", (req, res) => {
    let id =
        Math.random().toString(36).substring(2, 5) +
        Math.random().toString(36).substring(2, 5);

    games[id] = { game: new game.game(), pass: req.body.pass };
    res.redirect("/game/" + id);
});

app.post("/join", (req, res) => {
    console.log(req.body);

    res.send({
        status: "Not implemented",
    });
});

app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/style.css");
});
app.get("/game.js", (req, res) => {
    // res.sendFile(__dirname + "/game.js");
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
