'use strict';

import myEmitter from ''

myEmitter.on('event', () => {
    console.log('an event occurred!');
});

myEmitter.emit('event');


export default class WS {
    constructor(host = 'localhost', port = 8081) {
        this.ws = new WebSocket('ws://' + host + ':' + port);
    }

    init() {
        this.ws.onmessage = function (e) {
            var newP = document.createElement('p');
            newP.innerHTML = e.data;
            document.body.appendChild(newP);
        };
    }
}
