const fs = require('fs');

class ManagerUsuarios {
  constructor(path) {
    this.usuarios = [];
    this.path = path;
  }
  #id = 0;
  agregarUsuario(nombre, apellido, edad, curso) {
    const usuario = { nombre, apellido, edad };
    this.#id++;
    this.usuarios.push({ ...usuario,cursos:[curso], id: this.#id });
    fs.writeFileSync(this.path, JSON.stringify(this.usuarios));
  }

  consultarUsuarios() {
    const data = fs.readFileSync(this.path, 'utf-8');
    this.usuarios = JSON.parse(data);
    return this.usuarios;
  }

  eliminarUsuario(id) {
    const data = fs.readFileSync(this.path, 'utf-8');
    const index = this.usuarios.findIndex((usuario) => usuario.id === id);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      fs.writeFileSync(this.path, JSON.stringify(this.usuarios));
    }
  }

  agregarCurso(id, curso) {
    const index = this.usuarios.findIndex((usuario) => usuario.id === id);
    if (index !== -1) {
      this.usuarios[index].cursos.push(curso)
      fs.writeFileSync(this.path, JSON.stringify(this.usuarios));
    }
  }
}


  
  const manager =  new ManagerUsuarios('./usuarios.json')
  manager.agregarUsuario("juan", "alvarez", 15, "NodeJs");
  manager.agregarUsuario("Jose", "Gonzalez", 28, "ReactJs");
  manager.agregarCurso(1, "NestJS")
  console.log(manager.consultarUsuarios())
  manager.eliminarUsuario(1); 
  console.log(manager.consultarUsuarios())