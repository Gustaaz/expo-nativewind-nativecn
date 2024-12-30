import { database } from '@/database'
import { ProcessModel } from '@/database/model'
import { Q } from '@nozbe/watermelondb'

type UpdateStatusProcessProps = {
  id: number
  status: string
}

export async function updateStatusProcess({ id, status }: UpdateStatusProcessProps) {
  await database.write(async () => {
    const process = await database
      .get<ProcessModel>('processes')
      .query(Q.where('_id', Q.eq(id)))
      .fetch()

    await process[0].update((process) => {
      process.flgStatus = status
    })
    return process[0]
  })
}
