'use strict';

import emitter from './emitter'

export default class WS {

    constructor(host = 'localhost', port = 8081) {
        this.ws = new WebSocket('ws://' + host + ':' + port);
    }

    init() {
        this.ws.onmessage = function (e) {
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
            this.ws.send(JSON.stringify(data));
        });

        this.ws.onopen = function (e) {
            emitter.emit(WS.SEND_MSG_EVENT, {type: 'get_last_messages'});
        };
    }
    
    destroy() {
        this.ws.close();
        emitter.removeAllListeners(WS.SEND_MSG_EVENT);
    }
}

WS.RECEIVE_MSG_EVENT = 'RECEIVE_MSG_EVENT';
WS.SEND_MSG_EVENT = 'SEND_MSG_EVENT';
WS.RECEIVE_LAST_MSGS_EVENT = 'RECEIVE_LAST_MSGS_EVENT';
