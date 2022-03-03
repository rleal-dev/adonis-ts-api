import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        name: 'Admin',
        email: 'admin@email.com',
        password: '12345678',
      },
     {
        name: 'User Test',
        email: 'user@email.com',
        password: '12345678',
      },
    ])
  }
}
