
const port = process.env.PORT || 5000
const app = require('./app')
const socketIO = require('socket.io')
const sockets = require('./sockets/sockets')
var server = require('http').Server(app);

/* Se inicializa la instancia para manejo de sockets */
var io = socketIO(server);
/* Se inicializa llamado a sockets */
sockets(io, app);
/* Se inicializa llamado al server en el puerto definido */

app.set('socketio', io);

server.listen(port);