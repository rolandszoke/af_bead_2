'use strict'

const Lucid = use('Lucid')

class Director extends Lucid {
    movies () {
        return this.hasMany('App/Model/Movie')
    }
}

module.exports = Director
