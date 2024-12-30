import { tableSchema } from '@nozbe/watermelondb'

export const userSchema = tableSchema({
  name: 'users',
  columns: [
    { name: '_id', type: 'number', isIndexed: true },
    { name: 'nome', type: 'string' },
    { name: 'cpf', type: 'string' },
    { name: 'idusuario', type: 'number' },
    { name: 'siglalotacao', type: 'string' },
    { name: 'idlotacao', type: 'number' },
    { name: 'email', type: 'string', isIndexed: true },
    { name: 'descricaolotacao', type: 'string' },
    { name: 'password', type: 'string' }
  ]
})
