import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Login from 'App/Validators/LoginValidator'

export default class LoginController {
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(Login)

    try {
      const token = await auth.use('api').attempt(email, password)

      return token
    } catch {
      return response.unauthorized({
        message: 'Invalid credentials!'
      })
    }
  }
}
