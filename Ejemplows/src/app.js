//import
import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from '../src/utils.js'
import {Server} from 'socket.io'
import viewsRouter from './routes/views.router.js'

//express
const app = express()
const PORT = 8080
let productsList = []

const filePathProduct = `./src/files/products.json`

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
const socketServer = new Server(server)


app.engine('handlebars', handlebars.engine())

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/', viewsRouter)

socketServer.on('connection', socket => {
    console.log("New connection started")

    socket.emit('productsList', productsList)

    socket.on('addProduct', () => {
        
        io.sockets.emit('productsList', productsList)
    });

})