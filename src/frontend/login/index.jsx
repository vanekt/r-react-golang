import React from 'react'

export default class LoginView extends React.Component {
    constructor() {
        super();

        this.state = {
            username: ''
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleUsername(e) {
        this.setState({username: e.target.value});
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.props.loginCallback(this.state.username);
    }

    render() {
        let username = this.props.username;
        if (null !== username) {
            return (
                <div>
                    Hello, {username}!
                    <button onClick={this.props.logoutCallback}>Exit</button>
                </div>
            );
        }

        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <input
                        value={this.state.username}
                        onChange={this.handleUsername}
                    />
                    <button type="submit">Log in</button>
                </form>
            </div>
        );
    }
}