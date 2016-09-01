import React from 'react'

export default class Stats extends React.Component {
    render() {
        const
            stats = this.props.stats,
            loading = this.props.loading;

        if (true === loading || null === stats) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <ul>Total: {stats.total}</ul>
                <ul>My total: {stats.myMessagesCountTotal}</ul>
                <ul>My last 5 min: {stats.myMessagesCountLast5Minutes}</ul>
            </div>
        );
    }
}