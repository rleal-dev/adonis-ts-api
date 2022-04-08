import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class userRoleService {
  public async findAll(userId: Number) {
    const user = await User.findOrFail(userId)
    await user.load('roles')

    return user.roles
  }

  public async create(userId: Number, roles: any) {
    const user = await User.findOrFail(userId)

    return await user.related('roles').sync(roles, false)
  }

  public async delete(userId: Number, roleId: Number) {
    const [user, role] = await Promise.all([
      await User.findOrFail(userId),
      await Role.findOrFail(roleId)
    ])

    return await user.related('roles').detach([role.id])
  }
}
