import User from 'App/Models/User'

class UserService {
  public async findAll(request) {
    const page = request.input('page', 1)

    return await User.query().paginate(page, 20)
  }

  public async findOne(id: Number) {
    return await User.findOrFail(id)
  }

  public async create(payload) {
    return User.create(payload)
  }

  public async update(id: Number, payload: any) {
    const user: any = await User.findOrFail(id)

    user.name = payload.name
    user.email = payload.email
    user.password = payload.password

    return user.save()
  }

  public async delete(id: Number) {
    const user: any = await User.findOrFail(id)

    return user.delete()
  }
}

export default UserService
