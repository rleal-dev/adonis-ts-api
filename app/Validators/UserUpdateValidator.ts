import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string({
      escape: true,
      trim: true
    }),
    email: schema.string({
      escape: true,
      trim: true
    }, [
      rules.email()
    ]),
    password: schema.string.nullableAndOptional({
      escape: true,
      trim: true
    }, [
      rules.minLength(8)
    ]),
  })

  public messages = {}
}
