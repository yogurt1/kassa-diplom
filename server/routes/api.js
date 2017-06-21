const Router = require('koa-router');
const Event = require('../models/Event')
const config = require('../config');

const delay = (n) => new Promise(resolve => setTimeout(resolve, n));

const router = new Router();

router.get('/', async (ctx) => {
    await new delay(300)
    ctx.body = {
        message: 'Hello, world!'
    }
});

router.get('/events', async (ctx) => {
    const events = Event.findAll({})

    events.forEach(event => {
        event.seats = event.getAllSeats()
    })

    ctx.body = { success: true, events }
})

router.post('/submit', async (ctx) => {
    const { eventId, seatIds, form } = ctx.request.body

    const event = await Event.findById(eventId)
    const seats = await event.getSeatsByIds(seatIds)

    seats
        .forEach(seat => {
            if (seat.isTaken) {
                throw new Error(`seat ${seatId} already taken`)
            }

            seat.isTaken = true
            seat.save()
        })

    // pubsub.emitSeatIsTaken(eventId, seatId)

    ctx.body = { success: true }
})

module.exports = router;
