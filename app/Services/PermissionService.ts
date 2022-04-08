import Permission from 'App/Models/Permission'

export default class PermissionService {
  public async findAll(request) {
    const page = request.input('page', 1)

    return await Permission.query().paginate(page, 20)
  }

  public async findOne(id: Number) {
    return await Permission.findOrFail(id)
  }

  public async create(payload: any) {
    return await Permission.create(payload)
  }

  public async update(id: Number, payload: any) {
    const permission: Permission = await Permission.findOrFail(id)
    permission.merge(payload)

    return permission.save()
  }

  public async delete(id: Number) {
    const permission: Permission = await Permission.findOrFail(id)

    return permission.delete()
  }
}
