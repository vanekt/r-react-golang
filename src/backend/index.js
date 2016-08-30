'use strict';

var WebSocketServer = require('ws');

const
    webSocketServer = new WebSocketServer.Server({port: 8081}),
    clients = [];

webSocketServer.on('connection', (ws) => {
    let id = clients.length,
        newConnectionMsg = 'New connection: ID=' + id;

    clients[id] = ws;
    clients[id].send(JSON.stringify({
        type: 'system',
        text: newConnectionMsg
    }));

    console.log(newConnectionMsg);

    broadcast({
        type: 'system',
        text: 'New user: ' + id
    }, id);

    ws.on('close', () => {
        delete clients[id];
        let closeConnectionMsg = 'Connection closed for ' + id;

        console.log(closeConnectionMsg);

        broadcast({
            type: 'system',
            text: closeConnectionMsg
        }, id);
    });

    ws.on('message', (data) => {
        let msgData = JSON.parse(data);
        broadcast(msgData);
    });
});

function broadcast(messageObj, excludeKey) {
    for (let key in clients) {
        if (typeof excludeKey === 'undefined' || key != excludeKey) {
            clients[key].send(JSON.stringify(messageObj));
        }
    }
}