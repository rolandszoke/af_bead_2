'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Movie = use('App/Model/Movie')
const Actor = use('App/Model/Actor')
const Director = use('App/Model/Director')
const Validator = use('Validator')

class ActorController {

  * create (request, response) {
    yield response.sendView('actorCreate');
  }

  * doCreate (request, response) {
    const actorData = request.except('_csrf');

    const rules = {
      name: 'required',
      imdb: 'required',
      rottentomatoes: 'required'
    };

    const validation = yield Validator.validateAll(actorData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }
    const actor = yield Actor.create(actorData)
    response.redirect('/')
  }

  * show (request, response) {
    const id = request.param('id');
    const actor = yield Actor.find(id);
    //yield movie.related('category').load();

    yield response.sendView('actorShow', {
      actor: actor.toJSON()
    })
  }

   * search (request, response) {
    const page = Math.max(1, request.input('p'))
    const filters = {
      actorName: request.input('actorName') || ''
    }

    const actors = yield Actor.query()
      .where(function () {
        if (filters.actorName.length > 0) this.where('name', 'LIKE', `%${filters.actorName}%`)
      })
      .paginate(page, 9)

    yield response.sendView('actorSearch', {
      actors: actors.toJSON(),
      filters
    })
  }
  
}

module.exports = ActorController
