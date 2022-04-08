import Project from 'App/Models/Project'

export default class ProjectService {
  public async findAll(request) {
    const page = request.input('page', 1)

    return await Project.query().paginate(page, 20)
  }

  public async findOne(id: Number) {
    return await Project.findOrFail(id)
  }

  public async create(payload: any) {
    return await Project.create(payload)
  }

  public async update(id: Number, payload: any) {
    const project: Project = await Project.findOrFail(id)
    project.merge(payload)

    return project.save()
  }

  public async delete(id: Number) {
    const project: Project = await Project.findOrFail(id)

    return project.delete()
  }
}
