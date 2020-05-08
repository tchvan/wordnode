var express = require('express');
var router = express.Router();
const { Connector, Faker, Factory } = require('@tchvan/node-mysql');

const config = require('../config')
// require('../components/Install')(config)
const { Type, User, Post } = require('../components/Models')

const users = [
  "206158430209",
  "206158430210",
  "206158430211",
  "206158430212",
  "206158430213",
  "206158430214",
  "206158430215",
  "206158430216",
  "206158430217",
  "70574902607873",
  "70574902607874",
  "70574902607875",
  "70574902607876",
  // "70574902607877",
]

const user_name = 'tchvan@gmail.com'
const conn0 = new Connector(config)
const f = (new Factory(conn0))

// f.define(Type.User, (faker) => {
//   const email = faker.email()
//   return {
//     user_name: email,
//     name: email,
//     email,
//   }
// })
users.map((uuid, i) => {
  console.log("Inserting for user [" + i + "] " + uuid)
  const insert = f.define(Type.Post, (faker) => {
    return {
      uuid,
      name: faker.sentence() + " " + faker.number(),
      content: faker.paragraph(),
    }
  })
  insert.then(result => {
    // console.log(result)
    const { insertId } = result
    const u = new User(BigInt(uuid), conn0)
    u.link(insertId, Type.Post, '--hasMany->', null)
    u.link(insertId, Type.Post, '<-belongsTo--', null)

  })
})

const getSingleById = (single, res, next) => {
  const start = (new Date()).getTime()
  single.loadFromDB().then(result => {
    result = result[0]
    result.took = (new Date()).getTime() - start
    result.json = JSON.parse(result.json)
    // console.log("YYY", result)
    res.send(result)
    // next()
  })
}

const getUserById = (req, res, next) => {
  const user = new User(BigInt(req.params.id), conn0)
  getSingleById(user, res, next)
}

const getPostById = (req, res, next) => {
  const post = new Post(BigInt(req.params.id), conn0)
  getSingleById(post, res, next)
}

router.get('/users/:id', getUserById)
router.get('/posts/:id', getPostById)
router.get('/', function (req, res, next) { res.render('index', { title: 'Express' }); });
module.exports = router;       