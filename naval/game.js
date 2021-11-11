const ROWS = 10;
const COLS = 10;

class Game {
    constructor(myBoard, enemyBoard) {
        this.myBoard = myBoard;
        this.enemyBoard = enemyBoard;
    }

    shoot(x, y) {}
}

module.exports = { Game, COLS, ROWS };
