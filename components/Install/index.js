const Schema = require('@tchvan/node-mysql').Schema

function install(config) {

    const entities = ['posts', 'terms', 'users']
    const links = [
        // ['posts', 'terms'],
        // ['posts', 'users'],
        ['users', 'posts'],
    ]
    Schema.install(config, entities, links)
}

module.exports = install