import restify = require("restify");
import Log from "../Util";
import fs = require("fs");



/**
 * This configures the REST endpoints for the server.
 */
export default class Server {
    // REST
    private port: number;
    private rest: restify.Server = restify.createServer({
        name: "Chinese Chess HTML5",
    });;

    constructor(port: number) {
        Log.info("Server::<init>( " + port + " )");
        this.port = port;
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
               that.rest.use(restify.plugins.bodyParser({mapFiles: true, mapParams: true}));
               that.rest.use(
                   function crossOrigin(req, res, next) {
                       res.header("Access-Control-Allow-Origin", "*");
                       res.header("Access-Control-Allow-Headers", "X-Requested-With");
                       return next();
                   });

               // This is an example endpoint that you can invoke by accessing this URL in your browser:
               // http://localhost:4321/echo/hello
               that.rest.get("/echo/:msg", Server.echo);

               // NOTE: your endpoints should go here
               

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
            res.json(200, {result: response});
        } catch (err) {
            Log.error("Server::echo(..) - responding 400");
            res.json(400, {error: err});
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
        // Log.trace(req.url);
        // Log.trace(path);
        if (req.url !== "/") {
            // Log.trace(req.url?.split("/"));
            path = "build/frontend/" + req.url?.split("/").pop();
            // Log.trace(path);
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