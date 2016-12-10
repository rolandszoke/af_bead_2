'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Movie = use('App/Model/Movie')
const Actor = use('App/Model/Actor')
const Director = use('App/Model/Director')
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
    const directors = yield Director.all()
    yield response.sendView('movieCreate', {
      directors: directors.toJSON(),
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

  * edit (request, response) {
    const categories = yield Category.all()
    const directors = yield Director.all()
    const id = request.param('id');
    const movie = yield Movie.find(id);
    // console.log(movie.toJSON())



    yield response.sendView('movieEdit', {
      directors: directors.toJSON(),
      categories: categories.toJSON(),
      movie: movie.toJSON()
    });
  }

  * doEdit (request, response) {
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

    const id = request.param('id');
    const movie = yield Movie.find(id);

    // Object.assign(movie, movieData)
    
    movie.name = movieData.name;
    movie.imdb = movieData.imdb;
    movie.rottentomatoes = movieData.rottentomatoes;
    movie.trailer = movieData.trailer;
    movie.director_id = movieData.director_id;
    movie.category_id = movieData.category_id;

    yield movie.save()
    
    response.redirect('/')
  }

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

  * doDelete (request, response) {
    const id = request.param('id');
    const movie = yield Movie.find(id);

    yield movie.delete()
    response.redirect('/')
  }
  * search (request, response) {
    const page = Math.max(1, request.input('p'))
    const filters = {
      movieName: request.input('movieName') || '',
      category: request.input('category') || 0
    }

    const movies = yield Movie.query()
      .where(function () {
        if (filters.category > 0) this.where('category_id', filters.category)
        if (filters.movieName.length > 0) this.where('name', 'LIKE', `%${filters.movieName}%`)
      })
      .paginate(page, 9)

    const categories = yield Category.all()

    yield response.sendView('movieSearch', {
      movies: movies.toJSON(),
      categories: categories.toJSON(),
      filters
    })
  }
  
}

module.exports = MovieController
