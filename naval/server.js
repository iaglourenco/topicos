var express = require("express");
var game = require("./game");

var games = {};
var n_games = 0;
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

app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/style.css");
});

// API

app.get("/play", (req, res) => {
    let decoded = parseQuery(Buffer.from(req.query.id, "base64").toString());
    let id = decoded.room_id;
    let pass = decoded.pass;

    if (games[id] === undefined) {
        res.sendFile(__dirname + "/404.html");
    } else if (
        (games[id].game.winner !== undefined &&
            games[id].game.winner !== decoded.player_id) ||
        games[id].pass !== pass
    ) {
        res.sendFile(__dirname + "/403.html");
    } else {
        res.sendFile(__dirname + "/game.html");
    }
});

app.get("/board/:room_id", (req, res) => {
    let id = req.params.room_id;
    if (games[id] === undefined) {
        res.send({ error: "Room not found" });
    } else {
        res.send(games[id]);
    }
    res.end();
});

//Return a random board (don't ask me how this works, really complex logic down there)
app.get("/generate_board", (req, res) => {
    var board = [];

    resetBoard(board);

    putBoats(board, 4);
    putBoats(board, 1);
    putBoats(board, 2);
    putBoats(board, 3);

    res.send({
        board: board,
        cols: game.COLS,
        rows: game.ROWS,
    });
    res.end();
});

//Creates a new game, and returns the game id and the player_id
app.post("/create", (req, res) => {
    let id =
        Math.random().toString(36).substring(2, 5) +
        Math.random().toString(36).substring(2, 5);
    while (games[id] !== undefined) {
        id =
            Math.random().toString(36).substring(2, 5) +
            Math.random().toString(36).substring(2, 5);
    }
    games[id] = {
        game: new game.Game(req.body.board, []),
        pass: req.body.pass,
        cols: game.COLS,
        rows: game.ROWS,
        players: 1,
        currentPlayer: "p1",
    };
    res.send({ room_id: id, pass: req.body.pass, player_id: "p1" });
    n_games++;
    console.log("Room created:", id);
    console.log(`Number of rooms: ${n_games}\n`);
    res.end();
});

app.post("/shoot", (req, res) => {
    let id = req.body.room_id;
    let pass = req.body.pass;
    let pos = req.body.position;
    if (pass === games[id].pass && games[id].game.winner === undefined) {
        let result;
        if (games[id].currentPlayer == "p1") {
            result = games[id].game.shoot2(pos);
        } else if (games[id].currentPlayer == "p2") {
            result = games[id].game.shoot1(pos);
        }
        if (result === -2)
            games[id].currentPlayer =
                games[id].currentPlayer === "p1" ? "p2" : "p1";

        if (
            !games[id].game.board1.includes(1) &&
            !games[id].game.board1.includes(2) &&
            !games[id].game.board1.includes(3) &&
            !games[id].game.board1.includes(4)
        ) {
            games[id].game.winner = "p2";
        } else if (
            !games[id].game.board2.includes(1) &&
            !games[id].game.board2.includes(2) &&
            !games[id].game.board2.includes(3) &&
            !games[id].game.board2.includes(4)
        ) {
            games[id].game.winner = "p1";
        }
    }
    res.end();
});

app.post("/leave", (req, res) => {
    let id = req.body.room_id;
    let pass = req.body.pass;
    let player_id = req.body.player_id;

    if (games[id] === undefined) return;
    if (pass === games[id].pass) {
        games[id].players--;
        console.log(`Player ${player_id} left room ${id}`);
        if (games[id].players === 0) {
            n_games--;
            delete games[id];
            console.log("Room closed: " + id);
            console.log(`Number of rooms: ${n_games}\n`);
        } else {
            if (player_id === "p1")
                games[id].currentPlayer = games[id].game.winner = "p2";
            else games[id].currentPlayer = games[id].game.winner = "p1";
            games[id].game.wo = player_id;
        }
    }
    res.end();
});

app.post("/play_again", (req, res) => {
    let id = req.body.room_id;
    let pass = req.body.pass;

    if (pass === games[id].pass) {
        games[id].game.board1 = [];
        games[id].game.board2 = [];
        games[id].game.board1 = resetBoard(games[id].game.board1);
        games[id].game.board2 = resetBoard(games[id].game.board2);
        games[id].game.winner = undefined;

        if (games[id].game.wo === "p1") {
            games[id].game.board2 = putBoats(games[id].game.board2, 4);
            games[id].game.board2 = putBoats(games[id].game.board2, 1);
            games[id].game.board2 = putBoats(games[id].game.board2, 2);
            games[id].game.board2 = putBoats(games[id].game.board2, 3);
        }
        if (games[id].game.wo === "p2" || games[id].players === 2) {
            games[id].game.board1 = putBoats(games[id].game.board1, 4);
            games[id].game.board1 = putBoats(games[id].game.board1, 1);
            games[id].game.board1 = putBoats(games[id].game.board1, 2);
            games[id].game.board1 = putBoats(games[id].game.board1, 3);
        }
        games[id].game.wo = undefined;

        console.log("Room reset: " + id);
    }
    res.end();
});

//Join a game if the pass and ids are valid,returns the room_id and the player_id
app.post("/join", (req, res) => {
    let id = req.body.room_id;

    if (games[id] === undefined) {
        res.send({
            room_id: id,
            error: "404",
        });
    } else if (
        games[id].players === 2 ||
        games[id].pass !== req.body.pass ||
        games[id].game.winner !== undefined
    ) {
        res.send({
            room_id: id,
            error: "403",
        });
    } else {
        games[id].players += 1;
        games[id].game.setEnemyBoard(req.body.board);
        res.send({
            room_id: id,
            pass: req.body.pass,
            player_id: games[id].currentPlayer === "p1" ? "p2" : "p1",
        });
        console.log("Room joined: " + id + "\n");
    }
    res.end();
});

function parseQuery(queryString) {
    var query = {};
    var pairs = (
        queryString[0] === "?" ? queryString.substr(1) : queryString
    ).split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
}
//Resets the board and returns the board empty (all -1)
function resetBoard(board) {
    for (let i = 0; i < game.ROWS * game.COLS; i++) {
        board.push(-1);
    }
    return board;
}
//Put the boatTypes in the board and return the board with the boatTypes, returns -1 when a infinite loop is detected
function putBoats(board, boatType) {
    switch (boatType) {
        case 1:
            //Put size 1 boats
            for (let i = 0; i < 4; i++) {
                let randomPosition = Math.floor(
                    Math.random() * (game.COLS * game.ROWS - 1)
                );
                while (!isValidPosition(board, randomPosition)) {
                    randomPosition = Math.floor(
                        Math.random() * (game.COLS * game.ROWS - 1)
                    );
                }
                board[randomPosition] = 1;
            }
            break;
        case 2:
            //Put size 2 boats
            for (let i = 0; i < 3; i++) {
                let randomPosition = Math.floor(
                    Math.random() * (game.COLS * game.ROWS - 1)
                );
                let availableDirection = selectDirection(randomPosition);
                let randomPosition2 =
                    randomPosition +
                    availableDirection[
                        Math.floor(Math.random() * availableDirection.length)
                    ];
                while (
                    !isValidPosition(board, randomPosition) ||
                    !isValidPosition(board, randomPosition2)
                ) {
                    randomPosition = Math.floor(
                        Math.random() * (game.COLS * game.ROWS - 1)
                    );
                    availableDirection = selectDirection(randomPosition);
                    randomPosition2 =
                        randomPosition +
                        availableDirection[
                            Math.floor(
                                Math.random() * availableDirection.length
                            )
                        ];
                }

                board[randomPosition] = 2;
                board[randomPosition2] = 2;
            }
            break;
        case 3:
            //Put size 3 boats
            for (let i = 0; i < 2; i++) {
                let randomPosition = Math.floor(
                    Math.random() * (game.COLS * game.ROWS - 1)
                );
                let availableDirection = selectDirection(randomPosition);
                let selectedDirection =
                    availableDirection[
                        Math.floor(Math.random() * availableDirection.length)
                    ];
                let randomPosition2 = randomPosition + selectedDirection;
                let randomPosition3 = randomPosition2 + selectedDirection;
                while (
                    !isValidPosition(board, randomPosition) ||
                    !isValidPosition(board, randomPosition2) ||
                    !isValidPosition(board, randomPosition3) ||
                    (whichBorder(randomPosition2).includes("right") &&
                        whichBorder(randomPosition3).includes("left")) ||
                    (whichBorder(randomPosition2).includes("left") &&
                        whichBorder(randomPosition3).includes("right"))
                ) {
                    randomPosition = Math.floor(
                        Math.random() * (game.COLS * game.ROWS - 1)
                    );
                    availableDirection = selectDirection(randomPosition);
                    selectedDirection =
                        availableDirection[
                            Math.floor(
                                Math.random() * availableDirection.length
                            )
                        ];
                    randomPosition2 = randomPosition + selectedDirection;
                    randomPosition3 = randomPosition2 + selectedDirection;
                }

                board[randomPosition] = 3;
                board[randomPosition2] = 3;
                board[randomPosition3] = 3;
            }
            break;
        case 4:
            //Put size 4 boats
            for (let i = 0; i < 1; i++) {
                let randomPosition = Math.floor(
                    Math.random() * (game.COLS * game.ROWS - 1)
                );
                let availableDirection = selectDirection(randomPosition);
                let selectedDirection =
                    availableDirection[
                        Math.floor(Math.random() * availableDirection.length)
                    ];
                let randomPosition2 = randomPosition + selectedDirection;
                let randomPosition3 = randomPosition2 + selectedDirection;
                let randomPosition4 = randomPosition3 + selectedDirection;

                let loopCount = 0; //Detect if there's no space for a size 4 boat
                while (
                    !isValidPosition(board, randomPosition) ||
                    !isValidPosition(board, randomPosition2) ||
                    !isValidPosition(board, randomPosition3) ||
                    !isValidPosition(board, randomPosition4) ||
                    (whichBorder(randomPosition2).includes("right") &&
                        whichBorder(randomPosition3).includes("left")) ||
                    (whichBorder(randomPosition2).includes("left") &&
                        whichBorder(randomPosition3).includes("right")) ||
                    (whichBorder(randomPosition3).includes("right") &&
                        whichBorder(randomPosition4).includes("left")) ||
                    (whichBorder(randomPosition3).includes("left") &&
                        whichBorder(randomPosition4).includes("right"))
                ) {
                    randomPosition = Math.floor(
                        Math.random() * game.COLS * game.ROWS - 1
                    );
                    availableDirection = selectDirection(randomPosition);
                    selectedDirection =
                        availableDirection[
                            Math.floor(
                                Math.random() * availableDirection.length
                            )
                        ];
                    randomPosition2 = randomPosition + selectedDirection;
                    randomPosition3 = randomPosition2 + selectedDirection;
                    randomPosition4 = randomPosition3 + selectedDirection;
                    loopCount++;
                    if (loopCount >= 10000) {
                        console.log("Infinite loop detected");
                        return board;
                    }
                }

                board[randomPosition] = 4;
                board[randomPosition2] = 4;
                board[randomPosition3] = 4;
                board[randomPosition4] = 4;
            }
            break;
    }
    return board;
}

//Decide if the boat is horizontal or vertical
function selectDirection(pos) {
    const direction = [1, -1, game.COLS, -game.COLS]; //Define orientation, right,left,down,up

    const borderLocation = whichBorder(pos);
    if (borderLocation.includes("top"))
        direction.splice(direction.indexOf(-10), 1);
    if (borderLocation.includes("bottom"))
        direction.splice(direction.indexOf(10), 1);
    if (borderLocation.includes("left"))
        direction.splice(direction.indexOf(-1), 1);
    if (borderLocation.includes("right"))
        direction.splice(direction.indexOf(1), 1);

    return direction;
}
// Returns true if the position is valid
function isValidPosition(board, position) {
    if (position >= board.length || position < 0) return false;

    var occupiedPositions = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] !== -1) {
            occupiedPositions.push(i);
            if (!whichBorder(i).includes("right"))
                occupiedPositions.push(i + 1);

            if (!whichBorder(i).includes("left")) occupiedPositions.push(i - 1);

            if (!whichBorder(i).includes("bottom")) {
                occupiedPositions.push(i + game.COLS);
                occupiedPositions.push(i + game.COLS + 1);
                occupiedPositions.push(i + game.COLS - 1);
            }
            if (!whichBorder(i).includes("top")) {
                occupiedPositions.push(i - game.COLS);
                occupiedPositions.push(i - game.COLS + 1);
                occupiedPositions.push(i - game.COLS - 1);
            }
        }
    }
    return !occupiedPositions.includes(position);
}

//Return an array with the borders that the position is located(top,bottom,right,left), empty array if not on a border
function whichBorder(position) {
    var topBorderIndexes = [];
    var bottomBorderIndexes = [];
    var rightBorderIndexes = [];
    var leftBorderIndexes = [];
    for (let column = 1; column < game.COLS; column++) {
        topBorderIndexes.push(column); //top
        bottomBorderIndexes.push(
            column + game.ROWS * game.COLS - game.COLS - 1
        ); //bottom
    }

    for (let row = 1; row < game.ROWS; row++) {
        leftBorderIndexes.push(row * game.COLS); //left
        rightBorderIndexes.push(row * game.COLS + game.COLS - 1); //left
    }

    //Insert corners
    rightBorderIndexes.push(topBorderIndexes.pop()); //top-right
    topBorderIndexes.push(0); //top-left
    leftBorderIndexes.push(0); //top-left
    bottomBorderIndexes.push(game.COLS * game.ROWS - 1); //bottom-right

    var pos = [];

    if (topBorderIndexes.includes(position)) {
        pos.push("top");
    }
    if (bottomBorderIndexes.includes(position)) {
        pos.push("bottom");
    }
    if (leftBorderIndexes.includes(position)) {
        pos.push("left");
    }
    if (rightBorderIndexes.includes(position)) {
        pos.push("right");
    }
    return pos;
}

var port = 3000;
const server = app
    .listen(port, () => {
        console.log("Server running on port", port);
    })
    .on("error", (err) => {
        console.log("Error: ", err);
        process.exit(1);
    })
    .on("close", () => {
        setTimeout(() => {
            process.kill(process.pid);
        }, 100);
    });

process.once("SIGINT", () => {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    server.close(() => {
        console.log("\nServer stopped");
    });
});
