import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class RoleCreateValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string({
      escape: true,
      trim: true
    }),
    description: schema.string.nullableAndOptional({
      escape: true,
      trim: true
    }),
  })

  public messages = {}
}
