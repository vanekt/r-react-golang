import React from 'react'
import ReactDOM from 'react-dom'
import LoginView from './login'
import ChatView from './chat'
import WS from './ws'
import emitter from './emitter'

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
        this._wsDestroy = this._wsDestroy.bind(this);
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
        this.state.ws.destroy();
        this.setState({username: null});
        this._wsDestroy();
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

        emitter.on(WS.RECEIVE_MSG_EVENT, (data) => {
            console.log(data);
        });
    }

    _wsDestroy() {
        this.setState({ws: null});
        emitter.removeAllListeners(WS.RECEIVE_MSG_EVENT);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));