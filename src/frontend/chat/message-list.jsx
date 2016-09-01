import React from 'react'
import moment from 'moment'

export default class MessageList extends React.Component {
    constructor() {
        super();

        this.renderMessageList = this.renderMessageList.bind(this);
    }

    render() {
        if (this.props.loading) {
            return <div>Loading...</div>
        }

        return (
            <div className="chat-list-wrapper">
                <ul className="chat-list">{this.renderMessageList()}</ul>
            </div>
        );
    }

    renderMessageList() {
        var items = [];

        for (let i = 0; i < this.props.messages.length; i++) {
            let item = this.props.messages[i];
            items.push(
                <li key={i} className="chat-list__item">
                    {this.getDateBlock(item.timestamp)}<strong>{item.username}:</strong> {item.text}
                </li>
            );
        }

        return items;
    }

    getDateBlock(timestamp) {
        let dateStr = moment(timestamp).format('h:mm:ss');

        return <span className="chat-list__item__datetime">[{dateStr}]</span>
    }
}