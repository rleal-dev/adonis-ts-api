import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UserUpdateValidator {
  constructor(protected context: HttpContextContract) { }

  public refs = schema.refs({
    userId: this.context.params.id
  })

  public schema = schema.create({
    name: schema.string({
      escape: true,
      trim: true
    }),
    email: schema.string({
      escape: true,
      trim: true
    }, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
        caseInsensitive: true,
        whereNot: { id: this.refs.userId }
      }),
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
