'use strict';

var WebSocketServer = require('ws');

const
    webSocketServer = new WebSocketServer.Server({port: 8081}),
    clients = [];

webSocketServer.on('connection', (ws) => {
    let id = clients.length;
    clients[id] = ws;
    console.log('New connection: ID=' + id);
    clients[id].send('Hi! Your ID: ' + id);

    for (let key in clients) {
        if (key != id) {
            clients[key].send('New user: ' + id);
        }
    }

    ws.on('close', () => {
        delete clients[id];
    });
});
