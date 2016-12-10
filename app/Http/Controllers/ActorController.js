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
    var keyword = request.input('keyword');
    const actors = yield Actor.all()
    var actor = actors.filter(i => i.name.indexOf(keyword) > -1)
    actors.topactors = actor.toJSON();

    yield response.sendView('main', {
      name: '',
      actors: actors.toJSON()
    }) 
  }
  
}

module.exports = ActorController
