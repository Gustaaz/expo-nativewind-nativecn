import { database } from '@/database'
import { ScheduleModel } from '@/database/model'
import { Q } from '@nozbe/watermelondb'

export async function deleteSchedule(id: number) {
  await database.write(async () => {
    const schedule = await database
      .get<ScheduleModel>('schedules')
      .query(Q.where('_id', Q.eq(id)))
      .fetch()

    await schedule[0].destroyPermanently()
  })
}
