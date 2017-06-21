import React from 'react';
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Table } from 'react-bootstrap'
import Seat from './Seat'
import Event from '../../stores/Event'

const legend = {
    900: 'green',
    1500: 'blue',
    1900: 'red'
}

class BookingScene extends React.Component {
    static propTypes = {
        event: PropTypes.instanceOf(Event).isRequired,
        onSelect: PropTypes.func.isRequired,
    };

    onSelect = (seat) => {
        this.props.onSelect(seat)
    }

    renderLegend() {
        return (
            <div className='legend'>
                {Object.keys(legend)
                    .sort((a, b) => b - a)
                    .map(price => {
                        const color = legend[price]
                        return (
                            <div className='legend-item' key={price}>
                                <div
                                    className='legend-color'
                                    style={{ backgroundColor: color }}
                                />
                                <span className='legend-price'>{price} р.</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    renderSeats(seats, cellWidth) {
        return seats.map(seat => (
            <div
                key={seat.id}
                style={{ width: `${cellWidth}%` }}
            >
                <Seat
                    legend={legend}
                    seat={seat}
                    onSelect={this.onSelect}
                />
            </div>
        ))
    }

    render() {
        const { event } = this.props
        const cellWidth = 100 / (event.seats.length / event.rows)

        return (
            <div>
                <div className='flex-table'>
                    {this.renderSeats(event.seats, cellWidth)}
                </div>
                <br />
                {this.renderLegend()}
            </div>
        )
    }
}

export default observer(BookingScene);