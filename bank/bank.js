import * as Conta from "./account.js";

class Banco {
    constructor() {
        this._contas = [];
    }

    novaConta(nome, tipo) {
        switch (tipo) {
            case 1://Platinum
                this._contas.push(new Conta.Platinum(nome));
                return this._contas[-1]
            case 2://Basica
                this._contas.push(new Conta.Basica(nome));
                return this._contas[-1]
            case 3://Estudante
                this._contas.push(new Conta.Estudante(nome));
                return this._contas[-1]
            default:
                console.log("Tipo invalido")
                break;
        }
    }

    removeConta(id) {
        if(this._contas.find(e => e.id === id) != undefined)
            console.log("Conta "+ this._contas.splice(this._contas.indexOf(this._contas.find(e => e.id === id)),1)[0].id+" apagada")
    }

    resetContas() {
        this._contas.forEach(e => {
            e.reset()
        })
    }

    sacar(id,valor){
        if(this._contas.find(e => e.id === id) == undefined)
            return "Conta não encontrada"    
        this._contas.find(e => e.id === id).sacar(valor)
    }

    depositar(id,valor){
        if(this._contas.find(e => e.id === id) == undefined)
            return "Conta não encontrada"  
        this._contas.find(e => e.id === id).depositar(valor)
    }

    transferir(srcId,destId,valor){
        if(this._contas.find(e => e.id === srcId && e.id === destId ) == undefined)
            return "Conta não encontrada"  
        this._contas.find(e => e.id === srcId).sacar(valor)
        this._contas.find(e => e.id === destId).depositar(valor)
    }
}

const banco = new Banco()
let id1 = banco.novaConta("iago",1)
banco.novaConta("iago",2)
banco.novaConta("iago",3)
banco.sacar(id1,100)
banco.removeConta(id1)
console.log(banco._contas)