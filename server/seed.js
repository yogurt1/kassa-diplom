const faker = require('faker')
const uuid = require('uuid')
const Seat = require('./models/Seat')
const Event = require('./models/Event')

const times = (n, fn) => [...new Array(n)].reduce((acc, _, i) => [...acc, fn(i)], [])

const fakeSeats = (eventId, n) => times(n, () => ({
    eventId,
    id: uuid(),
    price: faker.random.arrayElement([1900, 1500, 900]),
    isTaken: false //faker.random.boolean()
}))

const fakeEvents = () => times(3, () => ({
    id: uuid.v4(),
    date: faker.date.future(1),
    name: faker.name.findName(),
    rows: 10
}))

const seed = () => {
    const eventsSeed = fakeEvents()
    const seatsSeed = eventsSeed.reduce((acc, event) => acc.concat(fakeSeats(event.id, event.rows * 10)), [])

    seatsSeed.forEach(seed => {
        const seat = Seat.fromJSON(seed)
        seat.save()
    })

    eventsSeed.forEach(seed => {
        const event = Event.fromJSON(seed)
        event.save()
    })
}

module.exports = seed