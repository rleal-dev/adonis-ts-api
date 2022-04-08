import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RoleService from 'App/Services/RoleService'
import RoleCreate from 'App/Validators/RoleCreateValidator'

@inject()
export default class RoleController {
  public constructor(private roleService: RoleService) { }

  public async index({ request }: HttpContextContract) {
    return await this.roleService.findAll(request)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(RoleCreate)

    try {
      const role = await this.roleService.create(payload)

      return response.created({
        message: 'Role created successfully!',
        data: role
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on create role!',
        error: error.message
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const role = await this.roleService.findOne(params.id)

    return response.ok({ data: role })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(RoleCreate)

    try {
      const role = await this.roleService.update(params.id, payload)

      return response.ok({
        message: 'Role updated successfully!',
        data: role
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on update role!',
        error: error.message
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      await this.roleService.delete(params.id)

      return response.ok({
        message: 'Role deleted successfully!',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on delete role!',
        error: error.message
      })
    }
  }
}
