'use strict';

import emitter from './emitter'

export default class WS {
    constructor(host = 'localhost', port = 8081) {
        this.ws = new WebSocket('ws://' + host + ':' + port);
    }

    init() {
        this.ws.onmessage = function (e) {
            emitter.emit('receiveMessage', e.data);
        };

        emitter.on('sendMessage', (data) => {
            console.log(data);
        });
    }
    
    destroy() {
        this.ws.close();
        emitter.removeAllListeners('sendMessage');
    }
}
