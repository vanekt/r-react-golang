import React from 'react'
import emitter from '../emitter'
import WS from '../ws'

export default class ChatView extends React.Component {
    constructor() {
        super();

        this.state = {
            message: ''
        };

        this.handleMessage = this.handleMessage.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render() {
        let username = this.props.username;
        if (null === username) {
            return <div></div>
        }

        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <input
                        value={this.state.message}
                        onChange={this.handleMessage}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }

    handleMessage(e) {
        this.setState({message: e.target.value});
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let message = this.state.message;

        emitter.emit(WS.SEND_MSG_EVENT, {
            username: this.props.username,
            message: message
        });

        this.setState({message: ''});
    }
}