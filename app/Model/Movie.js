'use strict'

const Lucid = use('Lucid')

class Movie extends Lucid {
    category() {
        return this.belongsTo('App/Model/Category')
    }
    actors() {
        return this.belongsToMany('App/Model/Actor')
    }
    director() {
        return this.belongsTo('App/Model/Director')
    }
}

module.exports = Movie
