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
                <h3>Stats</h3>
                <ul>Total: {stats.total}</ul>
                <ul>My total: {stats.myMessagesCountTotal}</ul>
                <ul>My last 5 min: {stats.myMessagesCountLast5Minutes}</ul>
                <div>
                    <p>Top 3 users all time:</p>
                    {this.renderTop3Users(stats.top3UsersAllTime)}
                </div>
                <div>
                    <p>Top 3 users last 5 minutes:</p>
                    {this.renderTop3Users(stats.top3UsersLast5Minutes)}
                </div>
            </div>
        );
    }

    renderTop3Users(data) {
        var items = [],
            length = data.length;

        if (length < 1) {
            return <div>No data</div>
        }

        for (let i = 0; i < length; i++) {
            items.push(<li key={i}>{data[i].username}: {data[i].count}</li>);
        }

        return <ul>{items}</ul>;
    }
}