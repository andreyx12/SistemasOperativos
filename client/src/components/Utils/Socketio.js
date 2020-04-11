
import io from "socket.io-client";

var socket = io();
window.$socket = socket;

function initSocketCommunication() {

    socket.on('connect', function(){
        console.log("communication started");
    });

    socket.on('allinfo', function(data){
        console.log("arrived");
    });
}

export default initSocketCommunication;