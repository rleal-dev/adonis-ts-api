import { schema } from '@ioc:Adonis/Core/Validator'

export default class PermissionCreateValidator {
  public schema = schema.create({
    name: schema.string({
      escape: true,
      trim: true
    }),
    description: schema.string({
      escape: true,
      trim: true
    }),
  })

  public messages = {}
}
