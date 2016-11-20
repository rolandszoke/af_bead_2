'use strict'

const Schema = use('Schema')

class DirectorsTableSchema extends Schema {

  up () {
    this.create('directors', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('imdb').notNullable()
      table.string('rottentomatoes').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('directors')
  }

}

module.exports = DirectorsTableSchema
