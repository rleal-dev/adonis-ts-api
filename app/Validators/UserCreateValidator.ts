import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UserCreateValidator {
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
      }),
    ]),
    password: schema.string({
      escape: true,
      trim: true
    }, [
      rules.minLength(8)
    ]),
  })

  public messages = {}
}
