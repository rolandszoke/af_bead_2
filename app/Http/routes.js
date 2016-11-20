'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'MovieController.index')
Route.get('/movies/create', 'MovieController.create').middleware('auth')
Route.post('/movies/create', 'MovieController.doCreate').middleware('auth')
Route.get('/movies/:id', 'MovieController.show')
Route.get('/actor/create', 'ActorController.create').middleware('auth')
Route.post('/actor/create', 'ActorController.doCreate').middleware('auth')
Route.get('/actor/:id', 'ActorController.show')
Route.get('/director/create', 'DirectorController.create').middleware('auth')
Route.post('/director/create', 'DirectorController.doCreate').middleware('auth')
Route.get('/director/:id', 'DirectorController.show')
Route.get('/search', 'MovieController.search')

Route.get('/register', 'UserController.register')
Route.get('/login', 'UserController.login')
Route.post('/register', 'UserController.doRegister')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')
