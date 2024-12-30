import { tableSchema } from '@nozbe/watermelondb'

export const documentSchema = tableSchema({
  name: 'documents',
  columns: [
    { name: '_id', type: 'number', isIndexed: true },
    { name: 'idDocumento', type: 'number' },
    { name: 'processosId', type: 'number' },
    { name: 'numero', type: 'string' },
    { name: 'ano', type: 'number' },
    { name: 'eDoc', type: 'string' },
    { name: 'idArqPdfCas', type: 'string' },
    { name: 'descricao', type: 'string' },
    { name: 'tipoDocumento', type: 'string' },
    { name: 'sigiloso', type: 'string' },
    { name: 'sgsistema', type: 'string' }
  ]
})
