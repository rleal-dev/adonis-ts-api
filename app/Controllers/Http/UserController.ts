import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'
import UserCreate from 'App/Validators/UserCreateValidator'

class UserController {

  public constructor(private userService: UserService) {
    this.userService = new UserService
  }

  public async index({ request }: HttpContextContract) {
    return this.userService.findAll(request)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(UserCreate)

    return this.userService.create(payload)
  }

  public async show({ params }: HttpContextContract) {
    return this.userService.findOne(params.id)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UserCreate)

    this.userService.update(params.id, payload)

    return response.ok({ message: 'User updated successfully.' })
  }

  public async destroy({ params, response }) {
    this.userService.delete(params.id)

    return response.ok({ message: 'User deleted successfully.' })
  }
}

export default UserController
