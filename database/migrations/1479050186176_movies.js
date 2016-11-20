'use strict'

const Schema = use('Schema')

class MoviesTableSchema extends Schema {

  up () {
    this.create('movies', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('imdb').notNullable()
      table.string('rottentomatoes').notNullable()
      table.string('trailer')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.integer('director_id').unsigned().references('id').inTable('directors')
      table.timestamps()
    })
  }

  down () {
    this.drop('movies')
  }

}

module.exports = MoviesTableSchema
