'use strict';

import emitter from './emitter'

export default class WS {
    constructor(host = 'localhost', port = 8081) {
        this.ws = new WebSocket('ws://' + host + ':' + port);
    }

    init() {
        this.ws.onmessage = function (e) {
            emitter.emit('wsMessage', e.data);
        };
    }
    
    destroy() {
        this.ws.close();
    }
}
