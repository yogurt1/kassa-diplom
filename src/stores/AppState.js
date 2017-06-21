import { extendObservable, action } from 'mobx'
import Event from './Event'
import * as api from '../utils/api'

export default class AppState {
    constructor() {
        extendObservable(this, {
            events: [],
            addEvents: action(events => {
                this.events = events.map(event => Event.fromJSON(event))
            })
        })
    }

    async loadEvents() {
        try {
            const json = await api.getEvents()
            const { events, success, error } = json

            if (!success && error) {
                const error = new Error('Fetched bad JSON')
                error.json = json

                throw error
            }

            this.addEvents(events)
        } catch (error) {
            throw error
        } finally {

        }
    }

    async submitFinish(event, seats, form) {
        const seatIds = event.selectedSeats.map(seat => seat.id)
        const json = await api.submitFinish(event.id, seatIds, form)

        if (!json.success) {
            const error = new Error('submit failed')
            error.json = json
            throw error
        }
    }
}