import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async index({ response }: HttpContextContract) {
    return {
      name: 'API - Adonis Js',
      status: response.getStatus()
    }
  }
}
