// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Sell from 'App/Models/Sell'
import Menu from 'App/Models/Menu'


export default class SellsController {

    
    public async check() {
        return await Sell.all()
    }

    public async buy({ request }) {
        var a = await Menu.all()
        a = Object.values(JSON.parse(JSON.stringify(a)))
        console.log(a)
        // console.log(request.body())
        var menu = ['']
        var quantity = [0]
        if (request.input('name').includes(',')) {
            menu = request.input('name').split(',')
        }
        else { menu[0] = request.input('name') }
        console.log(menu)
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].includes('*')) {
                var temp = menu[i].split('*')
                menu[i] = temp[0]
                quantity[i] = parseInt(temp[1])

            }
            else { quantity[i] = 1 }
            console.log(menu[i], quantity[i])
        }

        var count = 0
        for (var i = 0; i < a.length; i++) {
            for (var j = 0; j < menu.length; j++) {
                if (a[i].name === menu[j]) {
                    count++
                    var type = request.input('type') == "hot" ? false : true
                    var price = type == false ? a[i]['hot'] : a[i]['ice']
                    console.log("type : " + type + " price : " + price)
                    for (var k = 0; k < quantity[j]; k++) {
                        await Sell.create({
                            bev_id:a[i].id,
                            type:type,
                            price:price
                        })
                    }
                }
            }
        }
        if (count === 0) { return { "Message": "We don't have this menu" } }
        return ({ "buy successfully": request.input('name') + request.input('type') })
    }

    public async total() {
        return await Database.from('sells').select('bev_id').sum('price').groupBy('bev_id')

    }
}
