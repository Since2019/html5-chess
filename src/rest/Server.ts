import restify = require("restify");
import Log from "../Util";
import fs = require("fs");

import {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketIoServer,
    SocketData
} from "../utils/SocketIoServer"

import { Socket} from "socket.io"

var WebSocketServer = require('websocket').server;

const { fork, execFile } = require("child_process");

var cp = require('child_process');




function originIsAllowed(origin: any) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}


/**
 * This configures the REST endpoints for the server.
 */
export default class Server {
    
    // PVE的引擎Mapping
    private chess_engine_map : Map<Socket, any>;

    // private chess_engine = cp.spawn(__dirname + "/../ChessEngine/anita/ANITA.EXE", []); //the array is the arguments
    private chess_engine = cp.spawn(__dirname + "/../ChessEngine/YSSY.EXE", []); //the array is the arguments
    // REST
    private port: number;

    // 人机对战用的WebSocket
    private wsServer: typeof WebSocketServer;

    // PvP 用的 Socket.io
    private io: SocketIoServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;


    private rest: restify.Server = restify.createServer({
        name: "Chinese Chess HTML5",
    });

    constructor(port: number) {
        // that ref 用于 call back functions
        const that = this;

        // PVE的引擎Mapping
        this.chess_engine_map = new Map<Socket, any>();


        Log.info("Server::<init>( " + port + " )");
        this.port = port;


        this.io = new SocketIoServer(this.rest.server);

        this.io.on("connection", (socket: Socket) => {
            
            try {
                
                // Deep Shallow Copy?
                if("pve"){
                    console.log("socket.io, on connection, socket id:",socket.id);

                    const chess_engine = cp.spawn(__dirname + "/../ChessEngine/YSSY.EXE", []);
                    
                    that.chess_engine_map.set(socket, chess_engine);
                    
                }
                



                // 聊天
                socket.on('chat message', (msg: any) => {
                    console.log('message: ' + msg);
                });

                // 局面
                socket.on('fen_string', (fen_string: any) => {
                    console.log('fen_string: ' + fen_string);
                  
                    that.chess_engine_map.get(socket).stdout.on('data', function (data: any) {
                        console.log('stdout: ' + data);
                    });

                    that.chess_engine_map.get(socket).stdin.write('ucci\n'); //my command takes a markdown string...
                    that.chess_engine_map.get(socket).stdin.write(`position fen ${fen_string}\n`);
                    that.chess_engine_map.get(socket).stdin.write('go time 15000 increment 0\n');


                    that.chess_engine_map.get(socket).stdout.on("data",(data:any) => { 

                        console.log("data.toString('utf8')",data.toString("utf8"));



                        if(data.toString("utf8").includes("bestmove")){
                            if(data.toString("utf8").includes("ponder")){
                                let trimmed_data = (data.toString("utf8") + '').replace(/\n|\r/g, "").trim();
                                console.log("trimmed_data: '", trimmed_data, "'");
                                let retval = trimmed_data.substring(trimmed_data.length - 4, trimmed_data.length);
    
                                socket.emit('bestmove', retval)
                            }
                            else{
                                let trimmed_data = (data.toString("utf8") + '').replace(/\n|\r/g, "").trim();
                                console.log("trimmed_data: '", trimmed_data, "'");
                                let retval = trimmed_data.substring(trimmed_data.length - 4, trimmed_data.length);
    
                                socket.emit('bestmove', retval)
                            }
  
                        }
                    });



                    // that.chess_engine.stdin.write(`position fen ${fen_string}\n`);
                    // that.chess_engine.stdin.write('go time 15000 increment 0\n');
                    
                });





            }
            catch (err) {
                console.log(err)
            }

        });


               // this.wsServer = new WebSocketServer({
        //     httpServer: this.rest,
        //     // You should not use autoAcceptConnections for production
        //     // applications, as it defeats all standard cross-origin protection
        //     // facilities built into the protocol and the browser.  You should
        //     // *always* verify the connection's origin and decide whether or not
        //     // to accept it.
        //     autoAcceptConnections: false
        // });


        // this.wsServer.on('connect', function (request: any) {
        //     console.log("on connect");

        //     // that.chess_engine.stdin.write('ucci\n'); //my command takes a markdown string...
        //     // that.chess_engine.stdin.write('position fen rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1\n');
        // })

        // this.wsServer.on('request', function (request: any) {
        //     console.log("request");
        //     if (!originIsAllowed(request.origin)) {
        //         // Make sure we only accept requests from an allowed origin
        //         request.reject();

        //         console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        //         return;
        //     }

        //     var connection = request.accept('echo-protocol', request.origin);

        //     console.log((new Date()) + ' Connection accepted.');

        //     // socket 接收到消息的 Listener
        //     connection.on('message', function (message: any) {


        //         // 收到消息要回传
        //         if (that.chess_engine) {
        //             that.chess_engine.stdout.on('data', function (data: any) {
        //                 connection.sendUTF(data);
        //             });
        //         }


        //         if (message.type === 'utf8') {
        //             console.log('Received Message: ' + message.utf8Data);
        //             try {

        //                 let json_data = JSON.parse(message.utf8Data);

        //                 if (json_data.fen_string) {
        //                     let fen_string = json_data.fen_string;
        //                     that.chess_engine.stdin.write(`position fen ${fen_string}\n`);
        //                     that.chess_engine.stdin.write('go time 15000 increment 0\n');
        //                 }

        //             }
        //             catch (e) {

        //                 console.log(e);
        //                 console.log("It is not a JSON Object")
        //             }
        //             connection.sendUTF(message.utf8Data);
        //         }
        //         else if (message.type === 'binary') {
        //             console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
        //             connection.sendBytes(message.binaryData);
        //         }
        //     });
        //     connection.on('close', function (reasonCode: any, description: any) {
        //         console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        //     });

        // });


    }


    /**
    * Stops the server. Again returns a promise so we know when the connections have
    * actually been fully closed and the port has been released.
    *
    * @returns {Promise<boolean>}
    */
    public stop(): Promise<boolean> {
        Log.info("Server::close()");
        const that = this;
        return new Promise(function (fulfill) {
            that.rest.close(function () {
                fulfill(true);
            });
        });
    }




    /**
    * Starts the server. Returns a promise with a boolean value. Promises are used
    * here because starting the server takes some time and we want to know when it
    * is done (and if it worked).
    *
    * @returns {Promise<boolean>}
    */
    public start(): Promise<boolean> {

        const that = this;

        return new Promise(function (fulfill, reject) {
            try {
                Log.info("Server::start() - start");

                that.rest =
                    that.rest.use(restify.plugins.bodyParser({ mapFiles: true, mapParams: true }));
                that.rest.use(
                    function crossOrigin(req, res, next) {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.header("Access-Control-Allow-Headers", "X-Requested-With");
                        return next();
                    });

                that.rest.get("/ai/restart", (req, res) => {
                    console.log("restart");

                    // that.chess_engine = cp.spawn(__dirname + "/../ChessEngine/YSSY.EXE", []); //the array is the arguments

                    that.chess_engine.stdin.write('ucci\n'); //my command takes a markdown string...

                    that.chess_engine.stdin.write('position fen rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1\n');

                    that.chess_engine.stdin.write('go time 1500 increment 0\n');

                    that.chess_engine.stdout.on('data', function (data: any) {
                        console.log('stdout: ' + data);

                    });

                    res.send("restarting...")
                })


                // 启动象棋引擎
                that.rest.get("/ai/start", async (req, res) => {

                    // var child = cp.spawn(__dirname + "/../ChessEngine/anita/ANITA.EXE", []); //the array is the arguments

                    that.chess_engine.stdin.write('ucci\n'); //my command takes a markdown string...


                    //TODO 如果电脑是红棋：

                    // that.chess_engine.stdin.write('position fen rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1\n');

                    // that.chess_engine.stdin.write('go time 15000 increment 0\n');



                    that.chess_engine.stdout.on('data', function (data: any) {
                        console.log('stdout: ' + data);
                    });

                    res.end();

                })

                // that.rest.post('/ai/fen/position', (req, res, next) => {
                //     console.log("/ai/fen/position");
                //     console.log('position fen ' + req.body.fen_string + '\n');
                //     that.chess_engine.stdin.write('position fen ' + req.body.fen_string + '\n')
                //     that.chess_engine.stdin.write('go time 300000 increment 0\n');
                //     // res.header('content-type', 'text');
                //     res.charSet('utf-8');

                //     // setTimeout(() => { that.chess_engine.stdin.write('stop')},5000)


                //     try {
                //         that.chess_engine.stdout.on('data', async function (data: any) {
                //             console.log("pondering for bestmove...")
                //             console.log('stdout: ' + data);

                //             if (data.includes('bestmove')) {
                //                 console.log('includes bestmove:' + data)
                //                 let trimmed_data = (data + '').replace(/\n|\r/g, "").trim();

                //                 console.log("trimmed_data: '", trimmed_data, "'")
                //                 let retval = trimmed_data.substring(trimmed_data.length - 4, trimmed_data.length)

                //                 // that.chess_engine.stdout.off('data', function (data: any) {
                //                 //     console.log("off")
                //                 //   })
                //                     // res.send(retval);
                //                     // return next()

                //             }
                //             // res.end();

                //         });
                //     }
                //     catch(err){
                //         console.log("error" + err)
                //     }                    
                // })


                // This is an example endpoint that you can invoke by accessing this URL in your browser:
                // http://localhost:4321/echo/hello
                that.rest.get("/echo/:msg", Server.echo);

                // NOTE: your endpoints should go here

                // that.rest.get("/socket.io/:EIO", (req,res,next)=>{
                //     console.log("Socket.io",req.params);
                //     res.end();
                //     return next();
                // });



                // This must be the last endpoint!
                that.rest.get("/*", Server.getStatic);

                that.rest.listen(that.port, function () {
                    Log.info("Server::start() - restify listening: " + that.rest.url);
                    fulfill(true);
                });

                that.rest.on("error", function (err: string) {
                    // catches errors in restify start; unusual syntax due to internal
                    // node not using normal exceptions here
                    Log.info("Server::start() - restify ERROR: " + err);
                    reject(err);
                });

            } catch (err) {
                Log.error("Server::start() - ERROR: " + err);
                reject(err);
            }
        });
    }

    // The next two methods handle the echo service.
    // These are almost certainly not the best place to put these, but are here for your reference.
    // By updating the Server.echo function pointer above, these methods can be easily moved.
    private static echo(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace("Server::echo(..) - params: " + JSON.stringify(req.params));
        try {
            const response = Server.performEcho(req.params.msg);
            Log.info("Server::echo(..) - responding " + 200);
            res.json(200, { result: response });
        } catch (err) {
            Log.error("Server::echo(..) - responding 400");
            res.json(400, { error: err });
        }
        return next();
    }

    private static performEcho(msg: string): string {
        if (typeof msg !== "undefined" && msg !== null) {
            return `${msg}...${msg}`;
        } else {
            return "Message not provided";
        }
    }

    private static getStatic(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace("Getting static");
        const publicDir = "frontend/";
        Log.trace("RoutHandler::getStatic::" + req.url);
        let path = publicDir + "index.html";
        if (req.url !== "/") {
            path = "frontend/" + req.url;

            if (req.url?.includes("socket.io")) {
                res.end();
                return next();;
            }
            else if (req.url?.includes("svg")) {
                res.setHeader("content-type", "image/svg+xml");
            } else if (req.url?.includes("css")) {
                res.setHeader("content-type", "text/css");
            }
        }



        // Log.trace(path);
        fs.readFile(path, function (err: NodeJS.ErrnoException | null, file: Buffer) {
            // Log.trace(path);
            if (err) {
                res.send(500);
                Log.error(JSON.stringify(err));
                return next();
            }
            res.write(file);
            res.end();
            return next();
        });
    }

}