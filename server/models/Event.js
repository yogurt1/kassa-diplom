const Model = require('./Model')
const Seat = require('./Seat')

module.exports = class Event extends Model {
    static get dbName() {
        return 'events'
    }

    getAllSeats() {
        return Seat.findAll({ eventId: this.id })
    }

    getSeatById(seatId) {
        return Seat.findOne({ id: seatId, eventId: this.id })
    }

    getSeatsByIds(seatIds) {
        return seatIds.map(seatId => this.getSeatById(seatId))
    }
}