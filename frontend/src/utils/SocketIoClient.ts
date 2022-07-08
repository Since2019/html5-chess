// const { io, Manager  } = require("./socket.io");

import { io, Socket } from "socket.io-client";

// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
const socketIoClient = io("http://localhost:4321");


// const manager = new Manager("ws://example.com", {
//   reconnectionDelayMax: 10000,
//   query: {
//     "my-key": "my-value"
//   }
// });



socketIoClient.on("connect", () => {
    console.log("socketIoClient connected to server");
    socketIoClient.emit('chat message', "HEY HEY HEY");

    console.log(socketIoClient.id); // "G5p5..."

    // socketIoClient.on("bestmove", (data:any) => { 
    //     console.log("socketIoClient bestmove data");
    //     console.log(data);
    // });

  });




export {
    socketIoClient
}