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
                <ul>My total: {stats.my_total}</ul>
            </div>
        );
    }
}