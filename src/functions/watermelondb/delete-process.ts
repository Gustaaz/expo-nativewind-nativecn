import { database } from '@/database'
import { ProcessModel } from '@/database/model'
import { Q } from '@nozbe/watermelondb'

export async function deleteProcess(id: number) {
  await database.write(async () => {
    const process = await database
      .get<ProcessModel>('processes')
      .query(Q.where('_id', Q.eq(id)))
      .fetch()


    process.length > 0 && await process[0].destroyPermanently()
  })
}
