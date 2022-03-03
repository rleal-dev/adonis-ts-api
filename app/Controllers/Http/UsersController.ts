import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async index({request}: HttpContextContract) {
    const page = request.input('page', 1)

    return await User.query().paginate(page, 20)
  }
}

