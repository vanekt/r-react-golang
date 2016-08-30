import React from 'react'
import emitter from '../emitter'
import WS from '../ws'

export default class ChatView extends React.Component {
    constructor() {
        super();

        this.state = {
            message: '',
            messages: []
        };

        this.handleMessage = this.handleMessage.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.renderMessageList = this.renderMessageList.bind(this);
    }

    componentWillMount() {
        // TODO: get last messages (API?)
        emitter.on(WS.RECEIVE_MSG_EVENT, (data) => {
            let msg = JSON.parse(data);
            switch (msg.type) {
                case 'chat':
                    this.addMessage(msg);
                    break;
                default:
                    console.log(msg);
            }
        });
    }

    render() {
        let username = this.props.username;
        if (null === username) {
            return <div></div>
        }

        return (
            <div>
                <ul>{this.renderMessageList()}</ul>
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

    renderMessageList() {
        var items = [];

        for (let i = 0; i < this.state.messages.length; i++) {
            var item = this.state.messages[i];
            items.push(
                <li key={i}>
                    <strong>{item.username}:</strong> {item.text}
                </li>
            );
        }

        return items;
    }

    addMessage(data) {
        this.setState({
            messages: [...this.state.messages, data]
        });
    }

    handleMessage(e) {
        this.setState({message: e.target.value});
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let message = this.state.message;

        emitter.emit(WS.SEND_MSG_EVENT, {
            type: 'chat',
            username: this.props.username,
            text: message
        });

        this.setState({message: ''});
    }

    componentWillUnmount() {
        emitter.removeAllListeners(WS.RECEIVE_MSG_EVENT);
    }
}