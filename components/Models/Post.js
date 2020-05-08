const Model = require('@tchvan/node-mysql').Model
const Type = require('./Type')

class Post extends Model {

    constructor(name, conn) {
        super(name, conn, Type.Post)
    }

    user(){
        return this.belongsTo(Type.User)
    }
}

module.exports = Post