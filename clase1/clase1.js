const mostrarLista = (arreglo)=>{
    if(arreglo.length === 0){
        console.log("lista vacia")
    }else{
        arreglo.forEach(e => {
            console.log(e)
        });
    }
    console.log(`La longitud de la lista es ${arreglo.length}`)
}


const arreglo1 = []
const arreglo2 = [1,'a','casa', 2+2, {"nombre":"Hernan"}]

mostrarLista(arreglo1)
mostrarLista(arreglo2)


// ejercicio 2
class Persona {
    constructor(nombre){
        this.nombre = nombre
    }
    static especie = "humano"
saludar=()=>{
    console.log(`Hola mi nombre es ${this.nombre}`)
}
getEspecie= ()=>{
    console.log(`Mi especie es ${this.especie}`)
}
}






//ejercicio 3
class Contador{
    constructor(nombre){
        this.nombre = nombre
        this.contador = 0
    }
    static contadorGlobal = 0
        getResponsable= ()=>{
        console.log(`El responsable es ${this.nombre}`)
    }
    contar= ()=>{
        Contador.contadorGlobal++;
        this.contador++
    }
    getCuentaIndividual= ()=>{
        console.log(this.contador)
    }   
    getCuentaGlobal= ()=>{
        console.log( Contador.contadorGlobal)
    }
}
const contador= new Contador("Juan")
contador.contar()
contador.contar()
contador.getCuentaGlobal()
contador.getCuentaIndividual()