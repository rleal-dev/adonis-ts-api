import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProjectService from 'App/Services/ProjectService'
import ProjectCreate from 'App/Validators/ProjectCreateValidator'

@inject()
export default class ProjectController {
  public constructor(private projectService: ProjectService) { }

  public async index({ request }: HttpContextContract) {
    return await this.projectService.findAll(request)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(ProjectCreate)

    try {
      const project = await this.projectService.create(payload)

      return response.created({
        message: 'Project created successfully!',
        data: project
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on create project!',
        error: error.message
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const project = await this.projectService.findOne(params.id)

    return response.ok({ data: project })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(ProjectCreate)

    try {
      const project = await this.projectService.update(params.id, payload)

      return response.ok({
        message: 'Project updated successfully!',
        data: project
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on update project!',
        error: error.message
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      await this.projectService.delete(params.id)

      return response.ok({
        message: 'Project deleted successfully!',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Error on delete project!',
        error: error.message
      })
    }
  }
}
