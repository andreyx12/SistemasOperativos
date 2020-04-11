

var socket = io.connect();;
var usernameLoggedIn;

var socketChatConnection = {

    initSocketComunication: () => {
        console.log("INIT")
        
        socket.on('connectedUsers', function (data) {

            console.log(data._id);
            console.log(data);
        });

        socket.on('allinfo', function (data) {

            alert("hola")
        });
    },
}

$(document).ready(function () {

    socketChatConnection.initSocketComunication();

    $("#btnSendSocket").click(function(){
        socket.emit("btnSendSocket");
    });

    // $("#closeSessionId").click(function(){
    //     socket.emit('logout', { my: 'data' });
    //     window.location.href = "home";
    // });
});