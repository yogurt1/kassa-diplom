import { getJson, postJson } from './http'

export const getEvents = () => getJson('/api/events')

export const submitFinish = (eventId, seatIds, form) => postJson('/api/submit', { eventId, seatIds, form })