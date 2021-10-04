class Peao extends Peca {
    constructor(tipo, posI, posJ, id) {
        super(tipo, posI, posJ, id);
        this._numMovimento = 1;
    }

    mover(tabuleiro, i, j) {
        const B_QUEEN = 8; // "&#9819" ♛
        const W_QUEEN = 2; // "&#9813" ♕


        if (tabuleiro.getPeca(i, j) != undefined) {
            if (tabuleiro.getPeca(i, j).tipo == this.tipo) return false;
        }

        if (super.posJ == j) {
            //Andar reto
            if (tabuleiro.getRepresentacao()[i][j] == 0)
                switch (super.tipo) {
                    case 0: //Branca
                        if (super.posI - 1 == i) {
                            tabuleiro.rmPeca(super.posI, super.posJ);
                            super.posI = i;
                            super.posJ = j;
                            if (i == 0)
                                tabuleiro.addPeca(new Dama(0, i, j, W_QUEEN));
                            else tabuleiro.addPeca(this);
                            return true;
                        }
                        if (super.posI - 2 == i && this.posI == 6) {
                            tabuleiro.rmPeca(super.posI, super.posJ);
                            super.posI = i;
                            super.posJ = j;
                            tabuleiro.addPeca(this);
                            return true;
                        }
                        break;
                    case 1: //Preta

                        console.log(this.posI,super.posI,i)
                        if (super.posI + 1 == i) {
                            tabuleiro.rmPeca(super.posI, super.posJ);
                            super.posI = i;
                            super.posJ = j;
                            if (i == 7)
                                tabuleiro.addPeca(new Dama(1, i, j, B_QUEEN));
                            else tabuleiro.addPeca(this);
                            return true;
                        }
                        if (super.posI + 2 == i && this.posI == 1) {
                            tabuleiro.rmPeca(super.posI, super.posJ);
                            super.posI = i;
                            super.posJ = j;
                            tabuleiro.addPeca(this);
                            return true;
                        }
                        break;
                }
        } else if (
            (super.posJ - 1 == j || super.posJ + 1 == j) &&
            tabuleiro.getRepresentacao()[i][j] != 0
        ) {
            //Tentativa de comer
            switch (super.tipo) {
                case 0: //Branca
                    if (super.posI - 1 == i) {
                        this._movInit = 0;
                        tabuleiro.rmPeca(super.posI, super.posJ);
                        super.posI = i;
                        super.posJ = j;
                        if (i == 0)
                            tabuleiro.addPeca(new Rainha(0, i, j, W_QUEEN));
                        else tabuleiro.addPeca(this);
                        return true;
                    }
                    break;
                case 1: //Preta
                    if (super.posI + 1 == i) {
                        this._movInit = 0;
                        tabuleiro.rmPeca(super.posI, super.posJ);
                        super.posI = i;
                        super.posJ = j;
                        if (i == 7)
                            tabuleiro.addPeca(new Rainha(1, i, j, B_QUEEN));
                        else tabuleiro.addPeca(this);
                        return true;
                    }
                    break;
            }
        }
        return false;
    }
}
