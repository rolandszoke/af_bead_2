'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    movies () {
        return this.hasMany('App/Model/Movie')
    } 
}

module.exports = Category
