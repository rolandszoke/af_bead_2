'use strict'

const Schema = use('Schema')

class ActorsTableSchema extends Schema {

  up () {
    this.create('actors', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('imdb').notNullable()
      table.string('rottentomatoes').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('actors')
  }

}

module.exports = ActorsTableSchema
