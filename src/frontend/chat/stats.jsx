import React from 'react'

export default class Stats extends React.Component {
    render() {
        const stats = this.props.stats;
        if (null === stats) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <ul>Total: {stats.total}</ul>
            </div>
        );
    }
}