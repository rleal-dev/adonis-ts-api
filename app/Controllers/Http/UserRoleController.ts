import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import userRoleService from 'App/Services/userRoleService'

@inject()
export default class UserRoleController {
  public constructor(private userRoleService: userRoleService) { }

  public async index({ response, params }: HttpContextContract) {
    const roles = await this.userRoleService.findAll(params.user_id)

    return response.ok({ data: roles })
  }

  public async store({ request, response, params }: HttpContextContract) {
    const { roles } = request.body()

    try {
      await this.userRoleService.create(params.user_id, roles)

      return response.created({
        message: 'Role associated successfully!',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on associate role to user!',
        error: error.message
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      await this.userRoleService.delete(params.user_id, params.id)

      return response.ok({
        message: 'Role disassociated successfully!',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on disassociated role!',
        error: error.message
      })
    }
  }
}
