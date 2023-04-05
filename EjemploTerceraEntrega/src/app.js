const express = require('express')
const ManagerUsuarios = require('./ManagerUsuarios')

const app = express();

const mu = new ManagerUsuarios('usuarios.json')
//En el ejercicio falta agregar el query limit y esta todo sin asincronismo, idealmente estaria bueno que tenga asincronismo 
//y para el limit pueden recibirlo por req.query.limit y lo pasan en el metodo consultarUsuarios, 
//y dentro del mismo lo utilizan para limitar la cantidad de respuestas
app.get('/users', (req, res)=>{
  res.json(mu.consultarUsuarios())
})


app.get('/users/:pid', (req, res)=>{
  res.json(mu.consultarUsuarioPorId(req.params.pid))
})




app.listen(8080, () => {
    console.log('Corriendo en el puerto 8080');
  });