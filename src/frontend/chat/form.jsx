import React from 'react'
import ReactDOM from 'react-dom'
import emitter from '../common/emitter'
import WS from '../common/ws'

export default class ChatFormView extends React.Component {
    constructor() {
        super();

        this.state = {
            message: '',
            isValidMessage: true
        };

        this.textInput = null;
        this.handleMessage = this.handleMessage.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
    }

    componentDidMount() {
        if (this.textInput !== null) {
            ReactDOM.findDOMNode(this.textInput).focus();
        }
    }

    render() {
        let username = this.props.username;

        return (
            <div>
                <form onSubmit={this.handleFormSubmit} className="chat-form">
                    <div className={"input-group " + (this.state.isValidMessage ? "" : "has-error")}>
                        <span className="input-group-addon">
                            {username}
                            <i
                                title="Exit"
                                className="glyphicon glyphicon-log-out chat-form__log-out-btn"
                                onClick={this.props.logoutCallback}
                            />
                        </span>
                        <input
                            value={this.state.message}
                            onChange={this.handleMessage}
                            onBlur={this.onBlurHandler}
                            className="form-control"
                            ref={(ref) => this.textInput = ref}
                        />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="submit">Send</button>
                        </span>
                    </div>
                    <span
                        className={"chat-form__error-text " + (this.state.isValidMessage ? "" : "chat-form__error-text--show")}
                    >
                        Text must contain 20 and more symbols
                    </span>
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

        if (message.length < 20) {
            this.setState({isValidMessage: false});
            return;
        }

        this.setState({isValidMessage: true});

        emitter.emit(WS.SEND_MSG_EVENT, {
            type: 'chat',
            username: this.props.username,
            text: message
        });

        this.setState({message: ''});
    }

    onBlurHandler() {
        this.setState({isValidMessage: true});
    }
}