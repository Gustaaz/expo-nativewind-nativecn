import { tableSchema } from '@nozbe/watermelondb'

export const processSchema = tableSchema({
  name: 'processes',
  columns: [
    { name: '_id', type: 'number', isIndexed: true },
    { name: 'idProcesso', type: 'number' },
    { name: 'agendamento_id', type: 'number' },
    { name: 'anoProc', type: 'number' },
    { name: 'nrProc', type: 'number' },
    { name: 'assunto', type: 'string' },
    { name: 'classe', type: 'string' },
    { name: 'dtAutuacao', type: 'string' },
    { name: 'fase', type: 'string' },
    { name: 'interessado', type: 'string' },
    { name: 'nrdv', type: 'string' },
    { name: 'nrsiorg', type: 'string' },
    { name: 'protocolo', type: 'string' },
    { name: 'sinopse', type: 'string' },
    { name: 'status', type: 'string' },
    { name: 'flgStatus', type: 'string' },
    { name: 'motivoExclusao', type: 'string' },
    { name: 'is_flgEletronico', type: 'boolean' },
    { name: 'is_flgSigiloso', type: 'boolean' },
  ],
})
