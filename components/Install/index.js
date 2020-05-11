const Schema = require('@tchvan/node-mysql').Schema

const generator = require('./generateData')

const install = (config) => {

    const entities = ['posts', 'terms', 'users']
    const links = [
        ['users', 'posts'],
    ]
    Schema.install(config, entities, links)
}

module.exports = { install, generator }