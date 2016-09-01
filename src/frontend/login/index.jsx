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
            return <div></div>
        }

        return (
            <div className="row">
                <div className="col-xs-3">
                    <form onSubmit={this.handleFormSubmit}>
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
                        <button type="submit" className="btn btn-default">Log in</button>
                    </form>
                </div>
            </div>
        );
    }
}