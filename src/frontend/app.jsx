import React from 'react'
import ReactDOM from 'react-dom'
import LoginView from './login'
import ChatView from './chat'
import emitter from './common/emitter'
import WS from './common/ws'

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            username: null,
            ws: null
        };

        this.loginCallback = this.loginCallback.bind(this);
        this.logoutCallback = this.logoutCallback.bind(this);
        this._wsInit = this._wsInit.bind(this);
        this._wsClose = this._wsClose.bind(this);
    }

    componentWillMount() {
        let username = localStorage.getItem('username') || null;
        this.setState({username: username}, () => this._wsInit());
    }

    loginCallback(username) {
        // TODO: request to API
        this.setState({username: username}, () => {
            localStorage.setItem('username', username);
            this._wsInit();
        });
    }

    logoutCallback() {
        localStorage.removeItem('username');
        this.setState({username: null});
        this._wsClose();
    }

    render() {
        return (
            <div>
                <LoginView
                    username={this.state.username}
                    loginCallback={this.loginCallback}
                    logoutCallback={this.logoutCallback}
                />
                <ChatView
                    username={this.state.username}
                    ws={this.state.ws}
                />
            </div>
        );
    }

    _wsInit() {
        if (null === this.state.username) {
            return;
        }

        this.setState({ws: new WS()}, () => {
            this.state.ws.init();
        });

        emitter.on(WS.CONNECTION_CLOSED, (e) => {
            if (e.code !== 1000 && null !== this.state.ws) {
                console.log('Trying reconnect...');
                this.state.ws.init();
            }
        });
    }

    _wsClose() {
        this.setState({ws: null});
        emitter.removeAllListeners(WS.CONNECTION_CLOSED);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));