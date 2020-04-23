
const { addUser, removeUser, getUser, getTotalConnectedUsers, getUsers, getUsersById, getSocketId } = require('../utils/usermanager');

module.exports = function(io, app){

    /* Socket io initialization */
    io.on('connection', function (socket) {

        /* Seteo de instancio global */
        app.set('socketio', socket);
        /* Al conectarse un usuario se notifica cantidad de usuarios conectados */
        io.emit('connectedUsers', {connectedUsers: io.engine.clientsCount});

        socket.on("message", (message) => {
            console.log("socket message");
            console.log(message);
        });

        socket.on('updateViews', (data) => {
            io.emit('updateViews', data);
        });

        socket.on('add_product', (data) => {
            console.log('Paso por aqui'); 
            io.emit('add_product', data);
        });
        socket.on('updateComments', (data) => {
            io.emit('updateComments', data);
        });

        socket.on('disconnect', () => {
            io.emit('connectedUsers', {connectedUsers: io.engine.clientsCount});
            console.log("DISCONNECTED VALUE");
        });
    });
}

// const { addUser, removeUser, getUser, getTotalConnectedUsers, getUsers, getUsersById, getSocketId } = require('../utils/usermanager');

// module.exports = function(io){

//     /* Socket io initialization */
//     io.on('connection', function (socket) {
//         console.log("conecction established")

//         socket.on("addUser", (message) => {

//             addUser({id: socket.id, username: message.username});

//             socket.emit('news', {
//                 user: getUser(socket.id),
//                 users: getUsers(),
//                 connectedUsers: getTotalConnectedUsers()
//             });

//             socket.broadcast.emit('connectedUsers', {
//                 users: getUsers(),
//                 connectedUsers: getTotalConnectedUsers()
//             });
//         });

//         socket.on("disconnect", () => {
//             removeUser(socket.id);
//             socket.broadcast.emit("received", { message: "User has beed disconnected"  });
//             socket.broadcast.emit('connectedUsers', { 
//                 users: getUsersById(socket.id),
//                 connectedUsers: getTotalConnectedUsers()
//             });
//             console.log("Disconnected");
//         });

//         socket.on("logout", () => {
//             socket.disconnect();
//             removeUser(socket.id);
//             socket.broadcast.emit("received", { message: "User has beed disconnected"  });
//             socket.broadcast.emit('connectedUsers', {
//                 users: getUsersById(socket.id),
//                 connectedUsers: getTotalConnectedUsers(),
//             });
//             console.log("Disconnected");
//         });

//         socket.on("sendMessageToSocketId", (message) => {

//             let userBySocketId = getUser(socket.id);
//             let socketIdByUsername = getSocketId(message.username);
//             socket.to(`${socketIdByUsername.id}`).emit('message', { 
//                 chatMessage: message.sms,
//                 sender: userBySocketId.username
//             });
//         });
//     });
// }