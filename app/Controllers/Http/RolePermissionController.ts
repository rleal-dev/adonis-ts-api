import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import rolePermissionService from 'App/Services/rolePermissionService'

@inject()
export default class RolePermissionController {
  public constructor(private rolePermissionService: rolePermissionService) { }

  public async index({ response, params }: HttpContextContract) {
    const permissions = await this.rolePermissionService.findAll(params.role_id)

    return response.ok({ data: permissions })
  }

  public async store({ request, response, params }: HttpContextContract) {
    const { permissions } = request.body()

    try {
      await this.rolePermissionService.create(params.role_id, permissions)

      return response.created({
        message: 'Permission associated successfully!',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on associate permission to role!',
        error: error.message
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      await this.rolePermissionService.delete(params.role_id, params.id)

      return response.ok({
        message: 'Permission disassociated successfully!',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on disassociated permission!',
        error: error.message
      })
    }
  }
}
