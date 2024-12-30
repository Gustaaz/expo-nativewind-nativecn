import { tableSchema } from '@nozbe/watermelondb'

export const scheduleSchema = tableSchema({
  name: 'schedules',
  columns: [
    { name: '_id', type: 'number', isIndexed: true },
    { name: 'data_agendamento_at', type: 'number' },
    { name: 'email', type: 'string' },
    { name: 'status', type: 'string' },
    { name: 'nome', type: 'string' },
    { name: 'created', type: 'string' },
  ],
})
