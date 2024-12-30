import { appSchema } from '@nozbe/watermelondb'
import { userSchema } from './userSchema'
import { documentSchema } from './documentSchema'
import { processSchema } from './processSchema'
import { scheduleSchema } from './scheduleSchema'
import { base64Schema } from './base64Schema'
import { inspectionSheetSchema } from './inspectionsSheetSchema'
import { image64Schema } from './image64Schema'

export const schemas = appSchema({
  version: 16,
  tables: [
    // We'll add tableSchemas here later
    userSchema,
    documentSchema,
    processSchema,
    scheduleSchema,
    base64Schema,
    inspectionSheetSchema,
    image64Schema
  ]
})
