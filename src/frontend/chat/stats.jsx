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
            <div className="row stats">
                <div className="col-md-4">
                    <h3>Stats</h3>
                    <ul className="stats__common">
                        <li>Total: {stats.total}</li>
                        <li>My total: {stats.myMessagesCountTotal}</li>
                        <li>My last 5 min: {stats.myMessagesCountLast5Minutes}</li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <h3>Top 3 users all time:</h3>
                    {this.renderTop3Users(stats.top3UsersAllTime)}
                </div>
                <div className="col-md-4">
                    <h3>Top 3 users last 5 minutes:</h3>
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

        return <ol className="stats__top">{items}</ol>;
    }
}