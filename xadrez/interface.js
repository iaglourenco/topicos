var jogo = new JogoXadrez();

function init() {
    gerar_tabuleiro();
    jogo.reiniciar();
    atualizar_jogo();
}

function select(i, j) {
    var tabuleiro = document.getElementById("tabuleiro");
    var obj = tabuleiro.rows[i].cells[j];

    if (jogo.checaVitoria() != null) {
        jogo.checaVitoria() == 0
            ? alert("XEQUE-MATE - Vitoria das brancas!")
            : jogo.checaVitoria() == 1
            ? alert("XEQUE-MATE - Vitoria das pretas!")
            : null;
    } else if (
        select.obj_clicado === undefined ||
        select.obj_clicado === null
    ) {
        var peca = jogo.getPeca(i, j);
        if (peca != undefined && peca.tipo != jogo.getVez()) {
            jogo.getVez() == 0
                ? alert("Calma lá, agora é a vez das brancas")
                : alert("Calma lá, agora é a vez das pretas");
            return;
        }
        if (peca == null) return;
        select.obj_clicado = obj;
        select.obj_bgcolor = obj.style.backgroundColor;
        select.peca = peca;
        obj.style.backgroundColor = "#3AAFB9";
    } else if (jogo.moverPeca(select.peca, i, j)) {
        jogo.checaVitoria() == 0
            ? alert("XEQUE-MATE - Vitoria das brancas!")
            : jogo.checaVitoria() == 1
            ? alert("XEQUE-MATE - Vitoria das pretas!")
            : null;
        select.obj_clicado.style.backgroundColor = select.obj_bgcolor;
        select.obj_clicado = null;
        atualizar_jogo();
        jogo.rodaVez();
    } else {
        alert("Movimento inválido, se tiver com dúvidas veja as regras!");
        select.obj_clicado.style.backgroundColor = select.obj_bgcolor;
        select.obj_clicado = null;
    }
}

function atualizar_jogo() {
    const pecas = [
        "",
        "♔",
        "♕",
        "♖",
        "♗",
        "♘",
        "♙",
        "♚",
        "♛",
        "♜",
        "♝",
        "♞",
        "♟",
    ];
    let tabuleiro = document.getElementById("tabuleiro");
    let tabData = jogo.getTabuleiro();

    for (var i = 0, n = tabuleiro.rows.length; i < n; i++) {
        for (var j = 0, m = tabuleiro.rows[i].cells.length; j < m; j++) {
            obj = tabuleiro.rows[i].cells[j];
            obj.innerHTML = pecas[tabData[i][j]];
        }
    }
}

function reiniciar_jogo() {
    jogo.reiniciar();
    atualizar_jogo();
}

function gerar_tabuleiro() {
    var table = '<table id="tabuleiro" align="center">';
    var color = false;

    for (var i = 0; i < 8; i++) {
        table += "<tr>";
        for (var j = 0; j < 8; j++) {
            if (color) {
                table +=
                    '<td id="i' +
                    i +
                    "j" +
                    j +
                    '" bgcolor="silver" onclick="select(' +
                    i +
                    "," +
                    j +
                    ');"></td>';
            } else {
                table +=
                    '<td id="i' +
                    i +
                    "j" +
                    j +
                    '" bgcolor="white" onclick="select(' +
                    i +
                    "," +
                    j +
                    ');"></td>';
            }

            color = !color;
        }
        table += "</tr>";
        color = !color;
    }
    table += "</table>";
    document.write(table);
}
init();
