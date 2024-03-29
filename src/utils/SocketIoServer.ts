// import * as socketio from "socket.io";
import { Server as SocketIoServer}  from "socket.io";

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    hello: () => void;
  }
  
  interface InterServerEvents {
    ping: () => void;
  }
  
  interface SocketData {
    name: string;
    age: number;
  }


//   const io = new SocketIoServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

export {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
    SocketIoServer
}

