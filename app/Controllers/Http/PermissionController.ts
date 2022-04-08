import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionService from 'App/Services/PermissionService'
import PermissionCreate from 'App/Validators/PermissionCreateValidator'

@inject()
export default class PermissionController {
  public constructor(private permissionService: PermissionService) { }

  public async index({ request }: HttpContextContract) {
    return await this.permissionService.findAll(request)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(PermissionCreate)

    try {
      const permission = await this.permissionService.create(payload)

      return response.created({
        message: 'Permission created successfully!',
        data: permission
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on create permission!',
        error: error.message
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const permission = await this.permissionService.findOne(params.id)

    return response.ok({ data: permission })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(PermissionCreate)

    try {
      const permission = await this.permissionService.update(params.id, payload)

      return response.ok({
        message: 'Permission updated successfully!',
        data: permission
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on update permission!',
        error: error.message
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      await this.permissionService.delete(params.id)

      return response.ok({
        message: 'Permission deleted successfully!',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on delete permission!',
        error: error.message
      })
    }
  }
}
