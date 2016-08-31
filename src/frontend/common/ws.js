'use strict';

import emitter from './emitter'

export default class WS {

    constructor(host = 'localhost', port = 8081) {
        this.ws = null;
        this.host = host;
        this.port = port;
    }

    init() {
        this.ws = new WebSocket('ws://' + this.host + ':' + this.port);

        this.ws.onopen = (e) => {
            console.log('Connection established.');
            emitter.emit(WS.CONNECTION_ESTABLISHED, e);
        };

        this.ws.onclose = (e) => {
            console.log('Connection closed.');
            this.destroy(() => {
                emitter.emit(WS.CONNECTION_CLOSED, e);
            });
        };

        this.ws.onmessage = (e) => {
            let msg = JSON.parse(e.data);
            switch (msg.type) {
                case 'last_messages_list':
                    emitter.emit(WS.RECEIVE_LAST_MSGS_EVENT, msg);
                    break;
                default:
                    emitter.emit(WS.RECEIVE_MSG_EVENT, msg);
            }
        };

        emitter.on(WS.SEND_MSG_EVENT, (data) => {
            if (null !== this.ws) {
                this.ws.send(JSON.stringify(data));
            }
        });
    }

    close() {
        this.ws.close();
        this.ws = null;
    }

    destroy(callback) {
        emitter.removeAllListeners(WS.SEND_MSG_EVENT);
        
        if (typeof callback == 'function') {
            callback();
        }
    }
}

WS.RECEIVE_MSG_EVENT = 'RECEIVE_MSG_EVENT';
WS.SEND_MSG_EVENT = 'SEND_MSG_EVENT';
WS.RECEIVE_LAST_MSGS_EVENT = 'RECEIVE_LAST_MSGS_EVENT';
WS.CONNECTION_ESTABLISHED = 'CONNECTION_ESTABLISHED';
WS.CONNECTION_CLOSED = 'CONNECTION_CLOSED';
