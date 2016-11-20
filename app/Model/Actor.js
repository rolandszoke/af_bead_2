'use strict'

const Lucid = use('Lucid')

class Actor extends Lucid {
    movies () {
        return this.belongsToMany('App/Model/Movie')
    } 
}

module.exports = Actor
