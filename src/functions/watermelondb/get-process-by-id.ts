import { database } from '@/database'
import type { ProcessModel } from '@/database/model'
import { Q } from '@nozbe/watermelondb'

export async function getProcess(id: number) {
  const process = await database
    .get<ProcessModel>('processes')
    .query(Q.where('_id', Q.eq(id)))
    .fetch()

    return process[0]
}
