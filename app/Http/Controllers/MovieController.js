'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Movies = use('App/Model/Movie')
const Actors = use('App/Model/Actor')
const Directors = use('App/Model/Director')
const Validator = use('Validator')

class MovieController {

  * index(request, response) {
    const categories = yield Category.all()

    for(let category of categories) {
      const movies = yield category.movies().limit(3).fetch();
      category.topMovies = movies.toJSON();
    }

    yield response.sendView('main', {
      name: '',
      categories: categories.toJSON()
    })  
  }
/*
  * ownList (request, response) {
    const categories = yield Category.all()
    var userId = request.currentUser.id;

    for(let category of categories) {
      const movies = yield category.movies().where('user_id',userId).fetch();
      category.topMovies = movies.toJSON();
    }

    yield response.sendView('main', {
      name: '',
      categories: categories.toJSON()
    }) 
  }
*/
  * create (request, response) {
    const categories = yield Category.all()
    yield response.sendView('movieCreate', {
      categories: categories.toJSON()
    });
  }

  * doCreate (request, response) {
    const movieData = request.except('_csrf');

    const rules = {
      name: 'required',
      imdb: 'required',
      rottentomatoes: 'required',
      trailer: 'required',
      category_id: 'required',
      director_id: 'required'
    };

    const validation = yield Validator.validateAll(movieData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }

    //movieData.user_id = request.currentUser.id
    const movie = yield Movie.create(movieData)
    // response.send(movie.toJSON())
    response.redirect('/')
  }
/*
  * edit (request, response) {
    const categories = yield Category.all()
    const id = request.param('id');
    const movie = yield Movie.find(id);
    // console.log(movie.toJSON())

    if (request.currentUser.id !== movie.user_id) {
      response.unauthorized('Access denied.')
      return
    }


    yield response.sendView('movieEdit', {
      categories: categories.toJSON(),
      movie: movie.toJSON()
    });
  }

  * doEdit (request, response) {
    const movieData = request.except('_csrf');

    const rules = {
      name: 'required',
      ingredients: 'required',
      instructions: 'required',
      category_id: 'required'
    };

    const validation = yield Validator.validateAll(movieData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }

    const id = request.param('id');
    const movie = yield Movie.find(id);

    // Object.assign(movie, movieData)
    
    movie.name = movieData.name;
    movie.ingredients = movieData.ingredients; 
    movie.instructions = movieData.instructions;
    movie.category_id = movieData.category_id;

    yield movie.save()
    
    response.redirect('/')
  }
*/
  * show (request, response) {
    const id = request.param('id');
    const movie = yield Movie.find(id);
    yield movie.related('category').load();
    yield movie.related('director').load();
    // response.send(movie.toJSON())

    yield response.sendView('movieShow', {
      movie: movie.toJSON()
    })
  }
/*
  * doDelete (request, response) {
    const id = request.param('id');
    const movie = yield Movie.find(id);

    if (request.currentUser.id !== movie.user_id) {
      response.unauthorized('Access denied.')
      return
    }

    yield movie.delete()
    response.redirect('/')
  }*/
  * search (request, response) {
    const categories = yield Category.all()

    var keyword = request.input('keyword');

    for(let category of categories) {
      const movies = yield category.movies().fetch();
      var movies2 = movies.filter(i => i.name.indexOf(keyword) > -1)
      category.topmovies = movies2.toJSON();
    }

    yield response.sendView('main', {
      name: '',
      categories: categories.toJSON()
    }) 
  }
  
}

module.exports = MovieController
