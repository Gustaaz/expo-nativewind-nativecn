import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import UserModel from './model/userModel'
import { schemas } from './schemas/schema'
import {
  Base64Model,
  DocumentModel,
  Image64Model,
  InspectionSheetModel,
  ProcessModel,
  ScheduleModel
} from './model'

const adapter = new SQLiteAdapter({
  schema: schemas
})

export const database = new Database({
  adapter,
  modelClasses: [
    UserModel,
    DocumentModel,
    ScheduleModel,
    ProcessModel,
    Base64Model,
    InspectionSheetModel,
    Image64Model
  ]
})
