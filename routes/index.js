var express = require('express');
var router = express.Router();
const { Connector } = require('@tchvan/node-mysql');

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

router.get('/users/:id', getUserByUuid)
router.get('/posts/:id', getPostByUuid)
// router.get('/uuid/:id', getByUuid)
router.get('/', function (req, res, next) { res.render('index', { title: 'Express' }); });
module.exports = router;       