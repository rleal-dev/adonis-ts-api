import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'
import UserCreate from 'App/Validators/UserCreateValidator'
import UserUpdate from 'App/Validators/UserUpdateValidator'

@inject()
export default class UserController {
  public constructor(private userService: UserService) { }

  public async index({ request }: HttpContextContract) {
    return await this.userService.findAll(request)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(UserCreate)

    try {
      const user = await this.userService.create(payload)

      return response.created({
        message: 'User created successfully!',
        data: user
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on create user!',
        error: error.message
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const user = await this.userService.findOne(params.id)

    return response.ok({ data: user })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UserUpdate)

    try {
      const user = await this.userService.update(params.id, payload)

      return response.ok({
        message: 'User updated successfully!',
        data: user
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on update user!',
        error: error.message
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      await this.userService.delete(params.id)

      return response.ok({
        message: 'User deleted successfully!',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on delete user!',
        error: error.message
      })
    }
  }
}
