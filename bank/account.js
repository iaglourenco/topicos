
class Conta{

    constructor(nome){
        this._saldo = 0;
        this._transacoes = []
        this._correntista = nome
        this._id = new Date().getTime()
        console.log("Conta criada: - ID "+this._id)
        console.log("Correntista: "+this._correntista);
    }

    sacar(valor){
        this._saldo-=valor
        this._transacoes.push("Saque: "+valor+" "+new Date().getTime())
    }

    depositar(valor){
        this._saldo+=valor
        this._transacoes.push("Deposito: "+valor+" "+new Date().getTime())
    }

    extrato(){
        return this._transacoes
    }

    

    get nome(){
        return this._correntista
    }

    get saldo(){
        return this._saldo
    }

    get id(){
        return this._id
    }

}



export class Platinum extends Conta{
    constructor(nome){
        super(nome);
        this.__limiteSaque = -1
        this.__limiteExtrato = -1
        this.__limiteTransf = -1
    }
    reset(){
        this.__limiteSaque = -1
        this.__limiteExtrato = -1
        this.__limiteTransf = -1 
    }
}

export class Estudante extends Conta{
    constructor(nome){
        super(nome);
        this.__limiteSaque = 300
        this.__limiteExtrato = 1
        this.__limiteTransf = 1
    }
    reset(){
        this.__limiteSaque = 300
        this.__limiteExtrato = 1
        this.__limiteTransf = 1    
    }
}

export class Basica extends Conta{
    constructor(nome){
        super(nome);
        this.__limiteSaque = 1000
        this.__limiteExtrato = 3
        this.__limiteTransf = 3
    }
    reset(){
        this.__limiteSaque = 1000
        this.__limiteExtrato = 3
        this.__limiteTransf = 3
    }
}

