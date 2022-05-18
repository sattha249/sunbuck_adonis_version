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

import Database from '@ioc:Adonis/Lucid/Database'
import Route from '@ioc:Adonis/Core/Route'



// show all menu in database
Route.get('/',  ({request}) => { 
  // return path name without domain name or port if want to see query string put true in argument
  console.log("url = " + request.url())
  // return full complete url 
  console.log("full url = " + request.completeUrl())
  // return request method
  console.log("request method = " + request.method())
  return Database.from('menu').select('*')
})

// add menu into database
Route.post('/', async ({request}) => { 
  console.log("url = " + request.url())
  console.log("request method = " + request.method())
  // input body = {"message":"Hello World","code":"testasdasd"}

  // get all value from body
  console.log(request.body())
  // get one value from key in body
  console.log(request.input('code'))
  // get only value that in bracket
  console.log(request.only(['message']))
  // get only value that not in bracket
  console.log(request.except(['message']))
  await Database
  .table('menu')
  .insert({
    name:request.input('name'),
    hot:request.input('hot'),
    ice:request.input('ice') 
  })
  return { "add":request.body() }
})

//change price
Route.put('/', async ({request}) => {
  console.log("url = " + request.url())
  console.log("request method = " + request.method())
  console.log(request.body())
  await Database
  .from('menu')
  .where('name',request.input('name'))
  .update({
    hot:request.input('hot'),
    ice:request.input('ice') 
  })
  return { "update":request.body() }
})

//delete menu from database
Route.delete('/', async ({request}) => {
  console.log("url = " + request.url())
  console.log("request method = " + request.method())
  console.log(request.body())
  await Database
  .from('menu')
  .where('name',request.input('name'))
  .delete()
  return { "deleted": request.input('name') }
})

// show in buying today (no console.log anymore)
Route.get('/buy', async()=>{
  return Database.from('sell').select('*')
})

Route.post('/buy', async ({request})=>{
  var a = await Database.from('menu').select('*')
  for (var i = 0; i < a.length; i++){
    if (a[i].name === request.input('name')){
      console.log(request.input('name'))
      var type = request.input('type') == "hot" ? false : true
      var price = type == false ? a[i]['hot'] : a[i]['ice'] 
      console.log("type : " +type + " price : " +price)
       await Database.table('sell').insert({
        bev_id:a[i].id,
        type:type,
        price:price
      })
      return ({"buy successfully":request.input('name')+request.input('type')})
    }
    }
    return({"Message":"Not have this menu"})
})

Route.get('/total', async ()=>{
  // = select bev_id,sum(price) from sell group by bev_id
  return Database.from('sell').select('bev_id').sum('price').groupBy('bev_id')
})