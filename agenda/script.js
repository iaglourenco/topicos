class Contato{
    constructor(id,nome,telefone){
        this.id = id
        this.nome = nome
        this.telefone = telefone
    }
}

class Agenda{
    constructor(){
        this.contatos = []
    }
    inserir(contato) {
         this.contatos.push(contato)
    }
    remover(id){
        this.contatos = this.contatos.filter((value,index,arr)=>{
            return value.id !== id
        })
        return this.contatos
    }
    buscar(id){
        return this.contatos.filter((value,index,arr)=>{
            return value.id === id
        })
    }
    listar(){
        return this.contatos.sort((a,b)=> {
            if(a.nome > b.nome){
                return 1;
            }
            if(a.nome < b.nome){
                return -1;
            }
            return 0;
        })
    }
}

const agenda = new Agenda()

agenda.inserir(new Contato(01,"Ornitorrinco 1","Telefone do ornitorrinco 1"))
agenda.inserir(new Contato(09,"Dinossauro 9","Telefone do dinossauro 9"))
agenda.inserir(new Contato(02,"Ornitorrinco 2","Telefone do ornitorrinco 2"))
agenda.inserir(new Contato(03,"Ornitorrinco 3","Telefone do ornitorrinco 3"))

console.log(agenda.remover(01))
console.log(agenda.buscar(03))
console.log(agenda.listar())
