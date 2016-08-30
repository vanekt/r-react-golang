'use strict';

import emitter from './emitter'

export default class WS {

    constructor(host = 'localhost', port = 8081) {
        this.ws = new WebSocket('ws://' + host + ':' + port);
    }

    init() {
        this.ws.onmessage = function (e) {
            emitter.emit(WS.RECEIVE_MSG_EVENT, e.data);
        };

        emitter.on(WS.SEND_MSG_EVENT, (data) => {
            console.log(data);
        });
    }
    
    destroy() {
        this.ws.close();
        emitter.removeAllListeners(WS.SEND_MSG_EVENT);
    }
}

WS.RECEIVE_MSG_EVENT = 'RECEIVE_MSG_EVENT';
WS.SEND_MSG_EVENT = 'SEND_MSG_EVENT';
