function clearVisor(){
    document.calc.visor.value=""
}
function setVisor(str){

    if(str == "=")
        document.calc.visor.value = eval(document.calc.visor.value)    

    else 
        document.calc.visor.value = document.calc.visor.value + str
}