import React from 'react'
import MessageList from './message-list'
import Stats from './stats'
import ChatFormView from './form'
import emitter from '../common/emitter'
import WS from '../common/ws'

export default class ChatView extends React.Component {
    constructor() {
        super();

        this.state = {
            message: '',
            isValidMessage: true,
            messages: [],
            stats: null,
            loading: true
        };

        this.addMessage = this.addMessage.bind(this);
    }

    componentWillReceiveProps() {
        const promise = new Promise((resolve, reject) => {
            this.setState({'loading': true});

            emitter.once(WS.CONNECTION_ESTABLISHED, () => {
                emitter.emit(WS.SEND_MSG_EVENT, {
                    type: 'init',
                    username: this.props.username
                });
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
        });
    }

    componentWillMount() {
        emitter.on(WS.RECEIVE_MSG_EVENT, (msg) => {
            switch (msg.type) {
                case 'chat':
                    this.addMessage(msg);
                    break;
                default:
                    console.log(msg); // system message
            }
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
                <ChatFormView 
                    logoutCallback={this.props.logoutCallback}
                    username={username}
                />
                <Stats
                    stats={this.state.stats}
                    loading={this.state.loading}
                />
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

    componentWillUnmount() {
        emitter.removeAllListeners(WS.RECEIVE_MSG_EVENT);
    }
}