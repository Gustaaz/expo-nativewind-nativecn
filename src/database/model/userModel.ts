import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'
export default class UserModel extends Model {
  static table = 'users'

  @field('_id')
  _id!: number

  @field('nome')
  nome!: string

  @field('cpf')
  cpf!: string

  @field('idusuario')
  idusuario!: number

  @field('siglalotacao')
  siglalotacao!: string

  @field('idlotacao')
  idlotacao!: number

  @field('email')
  email!: string

  @field('descricaolotacao')
  descricaolotacao!: string

  @field('password')
  password!: string
}
