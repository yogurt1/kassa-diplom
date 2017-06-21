import { extendObservable, action, computed } from 'mobx'

export default class Seat {
    static fromJSON(json) {
        const seat = new this(json.id, json.price, json.isTaken)
        return seat
    }

    constructor(id, price, isTaken, event = null) {
        this.id = id
        extendObservable(this, {
            isTaken,
            price,
            event,
            isSelected: false,
            nth: computed(() => this.event.getNthOfSeat(this))
        })
    }

    setSelected = action(isSelected => {
        this.isSelected = isSelected
    })
}