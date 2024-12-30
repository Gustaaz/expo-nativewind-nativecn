import { Model } from '@nozbe/watermelondb'
import { date, field } from '@nozbe/watermelondb/decorators'

export class ScheduleModel extends Model {
  static table = 'schedules'

  @field('_id') _id!: number
  @field('email') email!: string
  @field('nome') nome!: string
  @date('data_agendamento_at') data_agendamento_at!: Date
  @field('status') status!: string
  @field('created') created!: string
}
