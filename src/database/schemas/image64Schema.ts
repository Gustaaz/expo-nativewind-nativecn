import { tableSchema } from '@nozbe/watermelondb'

export const image64Schema = tableSchema({
  name: 'image64',
  columns: [
    { name: 'inspectionSheetId', type: 'string', isIndexed: true },
    { name: 'image64', type: 'string' },
  ],
})
