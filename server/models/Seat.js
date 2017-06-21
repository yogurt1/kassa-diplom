const Model = require('./Model')
const Event = require('./Event')

module.exports = class Seat extends Model {
    static get dbName() {
        return 'seats'
    }
}