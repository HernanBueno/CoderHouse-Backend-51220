class TicketManager{

    #precioBaseDeGanancia = 0.15;

    constructor () {
       this.eventos = []
    }

    #getId(){
        if(this.eventos.length === 0) return 1 
        return this.eventos.length + 1
    }
    getEventos(){
        return this.eventos
    }
    agregarEvento(nombre, lugar, precio, capacidad =50, fecha = new Date()){
        const nuevoEvento = {
            idEvento: this.#getId(),
            nombre,
            lugar,
            precio:precio + precio * this.#precioBaseDeGanancia,
            capacidad,
            fecha,
            participantes:[]
        }
        this.eventos.push(nuevoEvento)
    }
    agregarUsuario(idEvento, idUser){
        const eventoExiste = this.eventos.find(evento=> evento.idEvento === idEvento)
        if(eventoExiste){
            const usuarioExiste = eventoExiste.participantes.find(p => p.idUser ===idUser)
            if (usuarioExiste) {
                return "Participante ya existente"
            }else{
                eventoExiste.participantes.push(idUser)
                return 'Se agrego participante'
            }
        }
        return "No existe evento"
    }
    //en este ultimo deberian usar spread operator para agregar el evento de la siguiente manera, donde yo uso el this.agregarEvento,
    // deberian colocar this.eventos.push({...this.#getId(), ...locaclidad, ...fecha, ...eventoExiste}), yo use esa otra forma por comodidad.
    ponerEventoEnGira(idEvento, localidad, fecha){
        const eventoExiste = this.eventos.find(evento=> evento.idEvento === idEvento)
        if (eventoExiste){
            this.agregarEvento(eventoExiste.nombre, localidad, eventoExiste.precio, eventoExiste.capacidad,fecha )
        }
    }
}

const tm = new TicketManager()
console.log(tm.getEventos())
tm.agregarEvento("Evento Prueba", "CABA", 200)
tm.agregarUsuario(1, 'Juan')
console.log(tm.getEventos())
tm.ponerEventoEnGira(1, "Rosario", new Date())
console.log(tm.getEventos())