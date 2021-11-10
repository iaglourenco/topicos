const ROWS = 10;
const COLS = 10;

class Game {
    constructor() {
        this.board = [];
    }

    get getBoard() {
        return this.board;
    }

    shoot(x, y) {}

    drawBoard() {
        var html = "<table>";
        for (let i = 0; i < ROWS; i++) {
            html += "<tr>";
            for (let j = 0; j < COLS; j++) {
                const pixelIndex = i * COLS + j;
                html += "<td>";
                html += `<div class="pixel-index">${pixelIndex}</div>`;
                html += `${this.board[pixelIndex]}`;
                html += "</td>";
            }
            html += "</tr>";
        }
        html += "</table>";
        document.querySelector("#my-board").innerHTML = html;
    }
}

module.exports = {
    game: Game,
};
