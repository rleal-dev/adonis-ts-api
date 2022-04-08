import User from 'App/Models/User'

export default class UserService {
  public async findAll(request) {
    const page = request.input('page', 1)

    return await User.query().paginate(page, 20)
  }

  public async findOne(id: Number) {
    return await User.findOrFail(id)
  }

  public async create(payload: any) {
    return await User.create(payload)
  }

  public async update(id: Number, payload: any) {
    const user: User = await User.findOrFail(id)
    user.merge(payload)

    return user.save()
  }

  public async delete(id: Number) {
    const user: User = await User.findOrFail(id)

    return user.delete()
  }
}
