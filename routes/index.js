var express = require('express');
var router = express.Router();
const { Connector, UUID } = require('@tchvan/node-mysql');

const config = require('../config')
const Install = require('../components/Install')
// Install.install(config)

const { User, Post } = require('../components/Models')

const users = [
  "206158430209",
  "206158430210",
  "206158430211",
  "206158430212",
  "206158430213",
  "70574902607873",
  "70574902607874",
  "70574902607875",
  "70574902607876",
  "70574902607877",
]

// posts 
// Inserted DB[0] post #1 UUID [68719476737]
// Inserted DB[0] post #2 UUID [68719476738]
// Inserted DB[0] post #3 UUID [68719476739]
// Inserted DB[0] post #4 UUID [68719476740]
// Inserted DB[0] post #5 UUID [68719476741]
// Inserted DB[1] post #1 UUID [70437463654401]
// Inserted DB[1] post #2 UUID [70437463654402]
// Inserted DB[1] post #3 UUID [70437463654403]
// Inserted DB[1] post #4 UUID [70437463654404]
// Inserted DB[1] post #5 UUID [70437463654405]

const conn0 = new Connector(config)

// const gen = new Install.generator(conn0)
// users.map((uuid) => gen.generatePosts(uuid).then(result => gen.createRelationShip(uuid, result)))

const getSingleById = (single, res, next) => {
  const start = (new Date()).getTime()
  single
    .loadFromDB()
    .then(result => {
      result = result[0]
      result.took = (new Date()).getTime() - start
      result.json = JSON.parse(result.json)
      // console.log("YYY", result)
      res.send(result)
      // next()
    })
    .catch(err => res.send(err))
}

const getUserByUuid = (req, res, next) => {
  const user = new User(BigInt(req.params.id), conn0)
  getSingleById(user, res, next)
}

const getPostByUuid = (req, res, next) => {
  const post = new Post(BigInt(req.params.id), conn0)
  getSingleById(post, res, next)
}

const getPostOfUser = (req, res, next) => {
  const { id, method } = req.params
  const user = new User(BigInt(id), conn0)
  const uid = user.uuid + ""
  if (user[method] && typeof user[method] === 'function') {
    user[method]().then(result => res.send({ uid, [method]: result }))
  } else {
    const error = { code: "method_not_found" }
    res.send({ uid, method, error })
  }
}

const getUserOfPost = (req, res, next) => {
  const { id, method } = req.params
  const user = new Post(BigInt(id), conn0)
  const uid = user.uuid + ""
  if (user[method] && typeof user[method] === 'function') {
    user[method]().then(result => res.send({ uid, [method]: result }))
  } else {
    const error = { code: "method_not_found" }
    res.send({ uid, method, error })
  }
}

const getObjectByUuid = (req, res, next) => {
  const { id } = req.params
  const uuid = new UUID(id)
  res.send(uuid.toText())
}

router.get('/users/:id', getUserByUuid)
router.get('/users/:id/:method', getPostOfUser)
router.get('/posts/:id', getPostByUuid)
router.get('/posts/:id/:method', getUserOfPost)
router.get('/uuid/:id', getObjectByUuid)
router.get('/', function (req, res, next) { res.render('index', { title: 'Express' }); });
module.exports = router;       