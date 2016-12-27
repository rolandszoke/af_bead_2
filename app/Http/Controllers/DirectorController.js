'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Movie = use('App/Model/Movie')
const Actor = use('App/Model/Actor')
const Director = use('App/Model/Director')
const Validator = use('Validator')

class DirectorController {

  * create (request, response) {
    yield response.sendView('directorCreate');
  }

  * doCreate (request, response) {
    const directorData = request.except('_csrf');

    const rules = {
      name: 'required',
      imdb: 'required',
      rottentomatoes: 'required'
    };

    const validation = yield Validator.validateAll(directorData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }
    const director = yield Director.create(directorData)
    response.redirect('/')
  }

  * show (request, response) {
    const id = request.param('id');
    const director = yield Director.find(id);
    //yield movie.related('category').load();

    yield response.sendView('directorShow', {
      director: director.toJSON()
    })
  }

  * search (request, response) {
    const page = Math.max(1, request.input('p'))
    const filters = {
      directorName: request.input('directorName') || ''
    }

    const directors = yield Director.query()
      .where(function () {
        if (filters.directorName.length > 0) this.where('name', 'LIKE', `%${filters.directorName}%`)
      })
      .paginate(page, 9)

    yield response.sendView('directorSearch', {
      directors: directors.toJSON(),
      filters
    })
  }
  
}

module.exports = DirectorController
