import React from 'react'
import ReactDOM from 'react-dom'

export default class LoginView extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        };

        this.passwordInput = null;
        this.handleUsername = this.handleUsername.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleUsername(e) {
        this.setState({username: e.target.value});
    }

    handleFormSubmit(e) {
        e.preventDefault();
        if (this.state.username.length > 0) {
            var passwordNode = ReactDOM.findDOMNode(this.passwordInput);
            this.props.loginCallback(this.state.username, passwordNode.value);
        }
    }

    render() {
        let username = this.props.username;
        if (null !== username) {
            return <div></div>
        }

        return (
            <div className="row">
                <div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                    <form onSubmit={this.handleFormSubmit} className="login-wrapper">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                className="form-control"
                                id="username"
                                placeholder="Enter your name"
                                value={this.state.username}
                                onChange={this.handleUsername}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className="form-control"
                                id="password"
                                type="password"
                                ref={(ref) => this.passwordInput = ref}
                                placeholder="Enter your password"
                            />
                        </div>
                        <button type="submit" className="btn btn-default">Log in</button>
                    </form>
                </div>
            </div>
        );
    }
}