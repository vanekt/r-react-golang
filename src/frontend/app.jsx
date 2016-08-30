import React from 'react'
import ReactDOM from 'react-dom'
import LoginView from './login'

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            username: null
        };

        this.loginCallback = this.loginCallback.bind(this);
        this.logoutCallback = this.logoutCallback.bind(this);
    }

    componentWillMount() {
        let username = localStorage.getItem('username') || null;
        this.setState({username: username});
    }

    loginCallback(username) {
        // TODO: request to API
        this.setState({username: username});
        localStorage.setItem('username', username);
    }

    logoutCallback() {
        this.setState({username: null});
        localStorage.removeItem('username');
    }

    render() {
        return (
            <div>
                <LoginView
                    username={this.state.username}
                    loginCallback={this.loginCallback}
                    logoutCallback={this.logoutCallback}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));