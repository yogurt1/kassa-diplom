import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { computed, createTransformer, extendObservable } from 'mobx'
import { Tooltip } from 'react-bootstrap'

class Seat extends React.Component {
    static propTypes = {
        seat: PropTypes.instanceOf(Seat).isRequired,
        onSelect: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context)
        extendObservable(this, {
            getColorForPrice: createTransformer(price => {
                const { legend } = this.props
                return price in legend ? legend[price] : 'black'
            }),
            backgroundColor: computed(() => {
                const { seat } = this.props

                if (seat.isTaken) {
                    return 'black'
                } else if (seat.isSelected) {
                    return 'yellow'
                } else {
                    return this.getColorForPrice(seat.price)
                }
            })
        })
    }

    onClick = (event) => {
        event.preventDefault();
        const { seat } = this.props;

        if (seat.isTaken) {
            alert('Место занято!');
        } else {
            this.props.onSelect(seat);
        }
    }

    renderSeatTakenTooltip() {
        return (
            <Tooltip id='seatTakenTooltip'>
                Место занято
            </Tooltip>
        )
    }

    render() {
        const { key, seat } = this.props;
        return (
            <div id={seat.id} key={key}>
                <a
                    className='seat'
                    style={{
                        backgroundColor: this.backgroundColor,
                        color: seat.isSelected ? 'black' : 'white'
                    }}
                    onClick={this.onClick}
                >
                    {seat.nth}
                </a>
            </div>
        );
    }
}

export default observer(Seat);