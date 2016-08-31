'use strict';

var WebSocketServer = require('ws');

const
    webSocketServer = new WebSocketServer.Server({port: 8081}),
    clients = [],
    messages = [];

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
        switch (msgData.type) {
            case 'get_last_messages':
                clients[id].send(JSON.stringify({
                    type: 'last_messages_list',
                    items: messages
                }));
                break;
            default:
                broadcast(msgData);
                messages.push(msgData);
                console.log('Count messages: ' + messages.length);
        }
    });
});

function broadcast(messageObj, excludeKey) {
    var debugKey = null;
    try {
        for (let key in clients) {
            debugKey = key;
            if (typeof excludeKey === 'undefined' || key != excludeKey) {
                clients[key].send(JSON.stringify(messageObj));
            }
        }
    } catch (e) {
        console.log('Broadcast error for ID=' + debugKey + ': ' + e.message);
    }
}