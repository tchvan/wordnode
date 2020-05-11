'use strict'

const { Factory } = require('@tchvan/node-mysql')
const { Type, User } = require('../Models')
const { RelationShip } = require('../RelationShip')

class Generator {
    constructor(conn0){
        this.conn0 = conn0
        // returnrs this
    }

    generatePosts(uuid) {
        const f = (new Factory(this.conn0))
        return f.define(Type.Post, (faker) => {
            return {
                uuid: uuid,
                name: faker.sentence() + " " + faker.number(),
                content: faker.paragraph(),
            }
        })
    }

    createRelationShip(uuid, result) {
        const { insertId } = result
        const u = new User(BigInt(uuid), this.conn0)
        u.createRelationShip(insertId, Type.Post, RelationShip.hasMany(), null)
    }
}

module.exports = Generator