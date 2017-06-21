import { extendObservable, createTransformer, computed } from 'mobx';
import Seat from './Seat'

export default class Event {
    static fromJSON(json) {
        const event = new this(json.id, json.name, json.date, json.rows)

        event.seats = json.seats
            .map(json => {
                const seat = Seat.fromJSON(json)
                seat.event = event
                return seat
            })

        return event
    }


    constructor(id, name, date, rows, seats = []) {
        this.id = id
        extendObservable(this, {
            name,
            date,
            rows,
            seats,
            datePretty: computed(() => {
                const a = new Date(this.date)
                var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентбярь','Октбярь','Ноябрь','Декабрь'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
                return time;
            }),
            selectedSeats: computed(() => this.seats.filter(seat => seat.isSelected)),
            seatsRows: computed(() => {
                let offset = 0
                const rows = [[]]

                this.seats.forEach((seat, idx) => {
                    const nth = idx + 1;
                    if ((nth % this.rows) === 0) {
                        offset += 1
                        rows[offset] = []
                    }
                    
                    rows[offset].push(seat)
                })

                return rows
            })
        });
    }

    getNthOfSeat = createTransformer(seat => {
        const seatIdx = this.seats.indexOf(seat)
        return (seatIdx % this.rows) + 1
    })
}