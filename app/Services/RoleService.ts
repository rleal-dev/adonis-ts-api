import Role from 'App/Models/Role'

export default class RoleService {
  public async findAll(request) {
    const page = request.input('page', 1)

    return await Role.query().paginate(page, 20)
  }

  public async findOne(id: Number) {
    return await Role.findOrFail(id)
  }

  public async create(payload: any) {
    return await Role.create(payload)
  }

  public async update(id: Number, payload: any) {
    const role: Role = await Role.findOrFail(id)
    role.merge(payload)

    return role.save()
  }

  public async delete(id: Number) {
    const role: Role = await Role.findOrFail(id)

    return role.delete()
  }
}
