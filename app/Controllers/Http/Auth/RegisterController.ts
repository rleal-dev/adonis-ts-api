import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'
import UserCreate from 'App/Validators/UserCreateValidator'

@inject()
export default class RegisterController {
  public constructor(private userService: UserService) { }

  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(UserCreate)

    try {
      const user = await this.userService.create(payload)

      return response.created({
        message: 'User registered successfully!',
        data: user
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on register user!',
        error: error.message
      })
    }
  }
}
