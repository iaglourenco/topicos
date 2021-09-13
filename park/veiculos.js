
Veiculo.prototype.getId = function () {
    return this.id;
};
Veiculo.prototype.getPlaca = function () {
    return this.placa;
};
Veiculo.prototype.getMarca = function () {
    return this.marca;
};
Veiculo.prototype.getCor = function () {
    return this.cor;
};
Veiculo.prototype.getProprietario = function () {
    return this.nomeDoProprietario;
};

export function Veiculo(id, placa, marca, cor, nomeDoProprietario) {
    this.placa = placa;
    this.id = id;
    this.marca = marca;
    this.cor = cor;
    this.nomeDoProprietario = nomeDoProprietario;
}



export function Carro(placa, marca, cor, nomeDoProprietario) {
    Veiculo.call(
        this,
        "id-" + placa.replaceAll("-", "").toLowerCase(),
        placa,
        marca,
        cor,
        nomeDoProprietario
    );
}
Carro.prototype = Object.create(Veiculo.prototype);
Carro.prototype.calcularValorPago = function (horaEntrada, horaSaida) {
    let difference = (horaSaida - horaEntrada) / 60000;
    if (difference <= 15) {
        return 0;
    } else if (difference >= 60 && difference < 240) {
        return 4 * (difference / 60);
    } else {
        return 20;
    }
};

export function Moto(placa, marca, cor, nomeDoProprietario) {
    Veiculo.call(
        this,
        "id-" + placa.replaceAll("-", "").toLowerCase(),
        placa,
        marca,
        cor,
        nomeDoProprietario
    );
}

Moto.prototype = Object.create(Veiculo.prototype);
Moto.prototype.calcularValorPago = function (horaEntrada, horaSaida) {
    let difference = (horaSaida - horaEntrada) / 60000;
    if (difference <= 30) {
        //30min
        return 0;
    } else if (difference >= 60 && difference < 240) {
        return 2 * (difference / 60);
    } else {
        return 10;
    }
};