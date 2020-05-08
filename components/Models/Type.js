'use strict'

class Type { }

Type.Post = { id: 1, slug: 'post', table: 'posts' }
Type.Term = { id: 2, slug: 'term', table: 'terms' }
Type.User = { id: 3, slug: 'user', table: 'users' }

module.exports = Type