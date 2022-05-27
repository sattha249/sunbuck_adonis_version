// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Menu from 'App/Models/Menu'
const menu = new Menu()

export default class MenusController {
    public async index({request}) {
        console.log("url = " + request.url())
        console.log("full url = " + request.completeUrl())
        console.log("request method = " + request.method())
        const list = await Menu.all()
        console.log(list)
        return list
    }

    public async show({ params }) {
        console.log(params)
        return await Menu.find(params.id)
    }

    public async store({ request ,response }) {
        console.log("url = " + request.url())
        console.log("request method = " + request.method())

        // get all value from body
        console.log(request.body())
        menu.name = request.input('name')
        menu.hot = request.input('hot')
        menu.ice = request.input('ice')
        await menu.save()
        response.status(201)
        return { "add": menu }
    }

    public async update({ request }) {
        console.log("url = " + request.url())
        console.log("request method = " + request.method())
        console.log(request.body())
        const bev = await Menu.findByOrFail('name',request.input('name'))
        bev.merge({hot:request.input('hot'),ice:request.input('ice')}).save()
        return { "update": request.body() }
    }

    public async destroy({ request }) {
        console.log("url = " + request.url())
        console.log("request method = " + request.method())
        console.log(request.body())
        const bev = await Menu.findByOrFail('name',request.input('name'))
        await bev.delete()
        
        return { "deleted": request.input('name') }
    }
}
