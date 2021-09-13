
Estacionamento.prototype.estacionar = function (veiculo, horaEntrada) {
    if (this.numeroDeVagas === 0) {
        console.log("Estacionamento lotado");
        return;
    }
    let element = {};
    element.veiculo = veiculo;
    element.horaEntrada = horaEntrada;
    element.horaSaida = undefined;
    this.estacionamento.push(element);
    this.numeroDeVagas -= 1;
    console.log("Veiculo estacionado:" + veiculo.id);
};

Estacionamento.prototype.liberar = function (idVeiculo, horaSaida) {
    let veiculo = {};
    let horaEntrada;

    this.estacionamento.forEach((e) => {
        if (e.veiculo.getId() === idVeiculo) {
            veiculo = e.veiculo;
            horaEntrada = e.horaEntrada;
            if (e.horaSaida === undefined) e.horaSaida = horaSaida;
            else veiculo = undefined;
            return;
        }
    });

    if (veiculo === undefined) {
        console.log("Veiculo não encontrado: " + idVeiculo);
        return;
    }

    this.saldo += veiculo.calcularValorPago(horaEntrada, horaSaida);
    console.log("Veiculo liberado:" + veiculo.id);
    this.numeroDeVagas += 1;
};

Estacionamento.prototype.gerarRelatorio = function () {
    console.log("\nRelatorio");

    console.log("Vagas livres: " + this.numeroDeVagas);
    this.getSaldo();
    let formatter = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    console.log("\nHistórico");
    this.estacionamento.forEach((e) => {
        console.log(
            e.veiculo.getMarca(),
            e.veiculo.getCor(),
            "do",
            e.veiculo.getProprietario() + ",",
            "Placa:",
            e.veiculo.getPlaca()
        );
        console.log(
            "\tHora entrada: " + formatter.format(new Date(e.horaEntrada))
        );
        if (e.horaSaida == undefined) {
            console.log("\tHora saida: Ainda estacionado");
        } else {
            console.log(
                "\tHora saida: " + formatter.format(new Date(e.horaSaida))
            );
            console.log(
                "\tTotal pago:",
                new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(
                    e.veiculo.calcularValorPago(e.horaEntrada, e.horaSaida)
                )
            );
        }
    });
};

Estacionamento.prototype.getSaldo = function () {
    let formatter = Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    console.log("Saldo atual: " + formatter.format(this.saldo));
};
export function Estacionamento(numeroDeVagas = 20) {
    this.numeroDeVagas = numeroDeVagas;
    this.estacionamento = [];
    this.saldo = 0;
    console.log("Estacionamento criado com " + numeroDeVagas + " vagas");
}
