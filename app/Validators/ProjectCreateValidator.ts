import { schema } from '@ioc:Adonis/Core/Validator'

export default class ProjectCreateValidator {
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
