import { database } from '@/database'
import { Base64Model, DocumentModel } from '@/database/model'
import { Q } from '@nozbe/watermelondb'

export async function deleteDocuments(processosId: number) {
  await database.write(async () => {
    const documents = await database
      .get<DocumentModel>('documents')
      .query(Q.where('processosId', Q.eq(processosId)))

    documents.map(async (document) => {
      const base64 = await database
        .get<Base64Model>('base64')
        .query(Q.where('eDoc', document.eDoc))
        .fetch()

      base64.length > 0 && (await base64[0].destroyPermanently())
      await document.destroyPermanently()
    })
  })
}
