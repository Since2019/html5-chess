const wsClient = new WebSocket("ws://localhost:4321",'echo-protocol');

wsClient.onopen = function (event :any) {
    wsClient.send("Connecting to ws Server");
};

wsClient.onmessage = function (event :any) {
    console.log('Message from server ', event.data);
};

export {
    wsClient
}