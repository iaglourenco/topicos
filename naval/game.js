const ROWS = 10;
const COLS = 10;

class Game {
    constructor(board1, board2) {
        this.board1 = board1;
        this.board2 = board2;
        this.winner = undefined;
    }

    setMyBoard(board) {
        this.board1 = board;
    }

    setEnemyBoard(board) {
        this.board2 = board;
    }

    setWinner(winner) {
        this.winner = winner;
    }

    // -1: empty
    // 1,2,3,4: ship
    // -2: miss
    // -3: hit
    shoot1(pos) {
        switch (this.board1[pos]) {
            case -1:
                this.board1[pos] = -2;
                break;
            case 1:
            case 2:
            case 3:
            case 4:
                this.board1[pos] = -3;
                break;
        }
    }
    shoot2(pos) {
        switch (this.board2[pos]) {
            case -1:
                this.board2[pos] = -2;
                break;
            case 1:
            case 2:
            case 3:
            case 4:
                this.board2[pos] = -3;
                break;
        }
    }
}

module.exports = { Game, COLS, ROWS };
