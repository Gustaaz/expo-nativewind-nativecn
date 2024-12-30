import { database } from "@/database"
import { ProcessModel } from "@/database/model"
import { Q } from "@nozbe/watermelondb"

type UpdateCancelProcessProps = {
    id: number
    motivoCancel: string
}
export async function updateCancelProcess({ id, motivoCancel }: UpdateCancelProcessProps) {
    await database.write(async () => {
        const process = await database
          .get<ProcessModel>('processes')
          .query(Q.where('_id', Q.eq(id)))
          .fetch()
    
        await process[0].update((process) => {
          process.flgStatus ='CANCELADO'
          process.motivoExclusao = motivoCancel
        })
        return process[0]
      })
}