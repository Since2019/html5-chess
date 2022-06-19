import Server from "./rest/Server";
import Log from "./Util";

const { fork ,execFile } = require("child_process");

var cp = require('child_process');



/**
 * Main app class that is run with the node command. Starts the server.
 */
export class App {
    public initServer(port: number) {
        Log.info("App::initServer( " + port + " ) - start");

        const server = new Server(port);
        server.start().then(function (val: boolean) {
            Log.info("App::initServer() - started: " + val);
        }).catch(function (err: Error) {
            Log.error("App::initServer() - ERROR: " + err.message);
        });




        // const chessEngine = fork(__dirname + "/ChessEngine/ANITA.EXE")

        // var child = cp.spawn(__dirname + "/ChessEngine/anita/ANITA.EXE", []); //the array is the arguments

        // child.stdin.write('ucci'); //my command takes a markdown string...


        // child.stdout.on('data', function (data:any) {
        //     console.log('stdout: ' + data);
        // });

        // setTimeout(()=>{
        //     chessEngine.send("ucci");
        // } , 500)

        // chessEngine.on("message", function (message:any) {
        //     console.log(`Message from child.js: ${message}`);
        //   });


    }









}

// This ends up starting the whole system and listens on a hardcoded port (4321)
Log.info("App - starting");
const app = new App();
app.initServer(4321);