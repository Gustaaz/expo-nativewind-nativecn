import { tableSchema } from '@nozbe/watermelondb'

export const base64Schema = tableSchema({
  name: 'base64',
  columns: [
    { name: 'eDoc', type: 'string', isIndexed: true },
    { name: 'base64', type: 'string' },
  ],
})
