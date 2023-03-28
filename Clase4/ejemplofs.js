const fs = require('fs');

class ManagerUsuarios {
  constructor() {
    this.usuarios = [];
  }

  crearUsuarios(nombre, apellido, edad, curso) {
    const usuario = { nombre, apellido, edad, curso };
    this.usuarios.push(usuario);
    fs.writeFileSync('usuarios.json', JSON.stringify(this.usuarios));
  }

  consultarUsuarios() {
    const data = fs.readFileSync('usuarios.json');
    this.usuarios = JSON.parse(data);
    return this.usuarios;
  }
}


const manager = new ManagerUsuarios()
manager.crearUsuarios("juan", "alvarez", 15, "NodeJs");
manager.crearUsuarios("Jose", "Gonzalez", 28, "ReactJs");
console.log(manager.consultarUsuarios())