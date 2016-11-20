'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Movies = use('App/Model/Movie')
const Actors = use('App/Model/Actor')
const Directors = use('App/Model/Director')
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
    var keyword = request.input('keyword');
    const directors = yield Director.all()
    var director = directors.filter(i => i.name.indexOf(keyword) > -1)
    directors.topdirectors = director.toJSON();

    yield response.sendView('main', {
      name: '',
      directors: directors.toJSON()
    }) 
  }
  
}

module.exports = DirectorController
