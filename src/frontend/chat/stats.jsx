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
                <div>
                    {this.renderTop3Users(stats.top3UsersAllTime)}
                </div>
            </div>
        );
    }

    renderTop3Users(data) {
        var items = [];
        for (let i = 0; i < data.length; i++) {
            items.push(<li key={i}>{data[i].username}: {data[i].count}</li>);
        }

        return (
            <div>
                <p>Top 3 users all time:</p>
                <ul>{items}</ul>
            </div>
        );
    }
}