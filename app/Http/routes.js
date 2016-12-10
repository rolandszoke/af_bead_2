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
Route.get('/movies', 'MovieController.search')
Route.get('/movies/:id/edit', 'MovieController.edit').middleware('auth')
Route.post('/movies/:id/edit', 'MovieController.doEdit').middleware('auth')
Route.get('/movies/:id/delete', 'MovieController.doDelete').middleware('auth')

Route.get('/actor/create', 'ActorController.create').middleware('auth')
Route.post('/actor/create', 'ActorController.doCreate').middleware('auth')
Route.get('/actor/:id', 'ActorController.show')
Route.get('/director/create', 'DirectorController.create').middleware('auth')
Route.post('/director/create', 'DirectorController.doCreate').middleware('auth')
Route.get('/director/:id', 'DirectorController.show')

Route.get('/register', 'UserController.register')
Route.get('/login', 'UserController.login')
Route.post('/register', 'UserController.doRegister')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')

Route.group('ajax', function () {
  Route.delete('/movies/:id/delete', 'MovieController.ajaxDelete').middleware('auth')
  Route.post('/login', 'UserController.ajaxLogin')
}).prefix('/ajax')
