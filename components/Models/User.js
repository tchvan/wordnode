const Model = require('@tchvan/node-mysql').Model
const Type = require('./Type')

class User extends Model {

    constructor(name, conn) {
        super(name, conn, Type.User)
    }

    posts() {
        return this.hasMany(Type.Post)
    }

    test() {
        return this.belongsTo(Type.Post)
    }
}

module.exports = User