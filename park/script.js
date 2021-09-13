import { Estacionamento } from "./estacionamento.js";
import { Carro, Moto } from "./veiculos.js";

const e = new Estacionamento();

e.estacionar(
    new Moto("FLS-1023", "Honda", "Vermelha", "Jão"),
    //new Date(<year>, <month>, <day>, <hour>, <minute>, <second>,<ms>).getTime()
    new Date(2021, 9, 13, 12, 43, 0, 0).getTime()
);
e.estacionar(
    new Moto("ADA-6524", "Yamaha", "Rosa", "Guilherme"),
    new Date(2021, 9, 13, 12, 43, 0, 0).getTime()
);
e.estacionar(
    new Moto("KAS-6845", "Ducati", "Preta", "Maicon"),
    new Date(2021, 9, 13, 12, 43, 0, 0).getTime()
);

e.estacionar(
    new Carro("KIW-1520", "Fiat", "Preta", "Daniel"),
    new Date(2021, 9, 13, 12, 43, 0, 0).getTime()
);

e.estacionar(
    new Carro("LAJ-2154", "GM", "Verde", "Paula"),
    new Date(2021, 9, 13, 12, 43, 0, 0).getTime()
);

e.estacionar(
    new Carro("LLA-1212", "Maserati", "Azul", "Jair"),
    new Date(2021, 9, 13, 12, 43, 0, 0).getTime()
);

e.liberar("id-kas6845", new Date(2021, 9, 13, 13, 43, 0, 0).getTime());
e.liberar("id-ada6524", new Date(2021, 9, 13, 14, 43, 0, 0).getTime());
e.liberar("id-fls1023", new Date(2021, 9, 13, 15, 43, 0, 0).getTime());

e.liberar("id-kiw1520", new Date(2021, 9, 13, 16, 43, 0, 0).getTime());

e.gerarRelatorio();
