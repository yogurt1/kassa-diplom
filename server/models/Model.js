const db = require('../db')

module.exports = class Model {
    static get db() {
        if (!(this.dbName in db)) {
            throw new Error(`db \`${this.dbName}\` not found`)
        }

        return db[this.dbName]
    }

    static fromJSON(json) {
        const inst = new this()
        Object.assign(inst, json)
        return inst
    }

    static findById(id) {
        return this.fromJSON(this.db.findById(id))
    }

    static findOne(query) {
        return this.fromJSON(this.db.findOne(query))
    }

    static findAll(query) {
        return this.db.findAll(query)
            .map(json => this.fromJSON(json))
    }

    save() {
        this.constructor.db.insert(this.toJSON())
    }

    toJSON() {
        return Object.assign(Object.create(null), this)
    }
}