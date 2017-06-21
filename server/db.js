const config = require('./config');

const matchQuery = (query, item) => !query ? true : Object.keys(query)
    .every(key => query[key] === item[key])

const createDb = (name) => {
    const items = []
    const db = {
        findById(id) {
            return items.find(item => item.id === id)
        },
        
        findOne(query) {
            return items.find(item => matchQuery(query, item))
        },

        findAll(query = false) {
            return items.filter(item => matchQuery(query, item))
        },

        insert(json) {
            const oldItem = items.find(item => item.id === json.id)

            if (oldItem) {
                Object.assign(oldItem, json)
            } else {
                items.push(json)
            }
        }
    }

    return db
}

const db = {
    events: createDb('events'),
    seats: createDb('seats')
};

module.exports = db;
