/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.get('/total','SellsController.total')

Route.get('/buy','SellsController.check')
// show all menu in database
Route.get('/','MenusController.index')

Route.get('/:id','MenusController.show')

// add menu into database
Route.post('/', 'MenusController.store') 

//change price
Route.put('/','MenusController.update')

//delete menu from database
Route.delete('/','MenusController.destroy')

// show in buying today (no console.log anymore)


Route.post('/buy','SellsController.buy')



