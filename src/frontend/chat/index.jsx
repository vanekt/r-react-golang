import React from 'react'
import MessageList from './message-list'
import Stats from './stats'
import emitter from '../common/emitter'
import WS from '../common/ws'

export default class ChatView extends React.Component {
    constructor() {
        super();

        this.state = {
            message: '',
            messages: [],
            stats: null,
            loading: true
        };

        this.handleMessage = this.handleMessage.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addMessage = this.addMessage.bind(this);
    }

    componentWillMount() {
        const promise = new Promise((resolve, reject) => {
            emitter.once(WS.CONNECTION_ESTABLISHED, () => {
                emitter.emit(WS.SEND_MSG_EVENT, {type: 'get_last_messages'});
            });

            emitter.once(WS.RECEIVE_LAST_MSGS_EVENT, (data) => {
                resolve(data);
            });

            setTimeout(() => reject('Can not get message list'), 10000);
        });

        promise.then(
            data => {
                this.setState({
                    'messages': data.items,
                    'stats': data.stats
                });
            },
            error => console.log(error)
        ).then(() => {
            this.setState({'loading': false});

            emitter.on(WS.RECEIVE_MSG_EVENT, (msg) => {
                switch (msg.type) {
                    case 'chat':
                        this.addMessage(msg);
                        break;
                    default:
                        console.log(msg); // system message
                }
            });
        });
    }

    render() {
        let username = this.props.username,
            ws = this.props.ws;

        if (null === username || null === ws) {
            return <div></div>
        }

        return (
            <div>
                <MessageList
                    messages={this.state.messages}
                    loading={this.state.loading}
                />
                <form onSubmit={this.handleFormSubmit}>
                    <input
                        value={this.state.message}
                        onChange={this.handleMessage}
                    />
                    <button type="submit">Send</button>
                </form>
                <Stats stats={this.state.stats} />
            </div>
        );
    }

    addMessage(data) {
        let stats = data.stats;
        delete data.stats;

        this.setState({
            messages: [...this.state.messages, data],
            stats: stats
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