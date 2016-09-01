'use strict';

var WebSocketServer = require('ws'),
    _ = require('underscore');

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
            case 'init':
                clients[id].username = msgData.username;
                clients[id].send(JSON.stringify({
                    type: 'last_messages_list',
                    items: messages,
                    stats: getStatsById(id, messages)
                }));
                break;
            default:
                msgData.timestamp = Date.now();
                messages.push(msgData);
                broadcast(msgData);
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
                if ('chat' == messageObj.type) {
                    messageObj.stats = getStatsById(key, messages);
                }

                clients[key].send(JSON.stringify(messageObj));
            }
        }
    } catch (e) {
        console.log('Broadcast error for ID=' + debugKey + ': ' + e.message);
    }
}

function getStatsById(id, messages) {
    const username = clients[id].username;

    return {
        'total': messages.length,
        'myMessagesCountTotal': getMyMessagesTotalCount(username, messages),
        'myMessagesCountLast5Minutes' : getMyMessagesCountLast5Minutes(username, messages)
    };
}

function getMyMessagesTotalCount(username, messages) {
    return _.filter(messages, function(o) {
        return o.username == username;
    }).length
}

function getMyMessagesCountLast5Minutes(username, messages) {
    const matchTimestamp = Date.now() - 5 * 60 * 1000;
    return _.filter(messages, function(o) {
        return o.username == username && o.timestamp >= matchTimestamp;
    }).length
}