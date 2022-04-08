import Role from 'App/Models/Role'
import Permission from 'App/Models/Permission'

export default class rolePermissionService {
  public async findAll(roleId: Number) {
    const role = await Role.findOrFail(roleId)
    await role.load('permissions')

    return role.permissions
  }

  public async create(roleId: Number, permissions: any) {
    const role = await Role.findOrFail(roleId)

    return await role.related('permissions').sync(permissions, false)
  }

  public async delete(roleId: Number, permissionId: Number) {
    const [role, permission] = await Promise.all([
      await Role.findOrFail(roleId),
      await Permission.findOrFail(permissionId)
    ])

    return await role.related('permissions').detach([permission.id])
  }
}
