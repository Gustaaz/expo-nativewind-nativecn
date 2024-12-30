import { database } from '@/database'
import type { Base64Model, DocumentModel, InspectionSheetModel, ProcessModel, ScheduleModel } from '@/database/model'

export async function removeDuplicatesDocuments() {

  console.log("removeDuplicatesDocuments");
  // Busque todos os usuários
  const allUsers = await database.get<DocumentModel>('documents').query().fetch()

  // Utilize um mapa para armazenar os usuários únicos com base em seu email
  const userMap = new Map()

  // Identifique duplicados
  for (let user of allUsers) {
    console.log(user);
    if (userMap.has(user.idDocumento)) {
      // Se o idDocumento já está no mapa, adicione o usuário à lista de duplicados
      userMap.get(user.idDocumento).push(user)
    } else {
      // Se não, crie uma nova entrada no mapa para este idDocumento
      userMap.set(user.idDocumento, [user])
    }
  }

  // Agora que temos todos os usuários duplicados, vamos remover os extras
  await database.write(async () => {
    for (let [email, users] of userMap) {
      if (users.length > 1) {
        // Ordena por ID (ou qualquer outro critério de desempate)
        const [userToKeep, ...usersToDelete] = users.sort((a, b) => a.id - b.id)

        // Remover os duplicados
        for (let user of usersToDelete) {
          await user.destroyPermanently()
        }
      }
    }
  })
  await removeDuplicatesProcesses()
}

async function removeDuplicatesProcesses() {
  // Busque todos os usuários
  const allUsers = await database.get<ProcessModel>('processes').query().fetch()

  // Utilize um mapa para armazenar os usuários únicos com base em seu email
  const userMap = new Map()

  // Identifique duplicados
  for (let user of allUsers) {
    console.log(user);
    if (userMap.has(user.idProcesso)) {
      // Se o id.idProcesso já está no mapa, adicione o usuário à lista de duplicados
      userMap.get(user.idProcesso).push(user)
    } else {
      // Se não, crie uma nova entrada no mapa para este id.idProcesso
      userMap.set(user.idProcesso, [user])
    }
  }

  // Agora que temos todos os usuários duplicados, vamos remover os extras
  await database.write(async () => {
    for (let [email, users] of userMap) {
      if (users.length > 1) {
        // Ordena por ID (ou qualquer outro critério de desempate)
        const [userToKeep, ...usersToDelete] = users.sort((a, b) => a.id - b.id)

        // Remover os duplicados
        for (let user of usersToDelete) {
          await user.destroyPermanently()
        }
      }
    }
  })

  await removeDuplicatesSchedules()
}

async function removeDuplicatesSchedules() {
  // Busque todos os usuários
  const allUsers = await database.get<ScheduleModel>('schedules').query().fetch()

  // Utilize um mapa para armazenar os usuários únicos com base em seu email
  const userMap = new Map()

  // Identifique duplicados
  for (let user of allUsers) {
    console.log(user);
    if (userMap.has(user.data_agendamento_at)) {
      // Se o id.data_agendamento_at já está no mapa, adicione o usuário à lista de duplicados
      userMap.get(user.data_agendamento_at).push(user)
    } else {
      // Se não, crie uma nova entrada no mapa para este id.data_agendamento_at
      userMap.set(user.data_agendamento_at, [user])
    }
  }

  // Agora que temos todos os usuários duplicados, vamos remover os extras
  await database.write(async () => {
    for (let [email, users] of userMap) {
      if (users.length > 1) {
        // Ordena por ID (ou qualquer outro critério de desempate)
        const [userToKeep, ...usersToDelete] = users.sort((a, b) => a.id - b.id)

        // Remover os duplicados
        for (let user of usersToDelete) {
          await user.destroyPermanently()
        }
      }
    }
  })
}

async function removeDuplicatesBase64() {
  // Busque todos os usuários
  const allUsers = await database.get<Base64Model>('base64').query().fetch()

  // Utilize um mapa para armazenar os usuários únicos com base em seu email
  const userMap = new Map()

  // Identifique duplicados
  for (let user of allUsers) {
    console.log(user);
    if (userMap.has(user.eDoc)) {
      // Se o id.eDoc já está no mapa, adicione o usuário à lista de duplicados
      userMap.get(user.eDoc).push(user)
    } else {
      // Se não, crie uma nova entrada no mapa para este id.eDoc
      userMap.set(user.eDoc, [user])
    }
  }

  // Agora que temos todos os usuários duplicados, vamos remover os extras
  await database.write(async () => {
    for (let [email, users] of userMap) {
      if (users.length > 1) {
        // Ordena por ID (ou qualquer outro critério de desempate)
        const [userToKeep, ...usersToDelete] = users.sort((a, b) => a.id - b.id)

        // Remover os duplicados
        for (let user of usersToDelete) {
          await user.destroyPermanently()
        }
      }
    }
  })
}

// async function removeDuplicatesInspectionSheets() {
//   // Busque todos os usuários
//   const allUsers = await database.get<InspectionSheetModel>('inspection_sheets').query().fetch()

//   // Utilize um mapa para armazenar os usuários únicos com base em seu email
//   const userMap = new Map()

//   // Identifique duplicados
//   for (let user of allUsers) {
//     console.log(user);
//     if (userMap.has(user.data_agendamento_at)) {
//       // Se o id.data_agendamento_at já está no mapa, adicione o usuário à lista de duplicados
//       userMap.get(user.data_agendamento_at).push(user)
//     } else {
//       // Se não, crie uma nova entrada no mapa para este id.data_agendamento_at
//       userMap.set(user.data_agendamento_at, [user])
//     }
//   }

//   // Agora que temos todos os usuários duplicados, vamos remover os extras
//   await database.write(async () => {
//     for (let [email, users] of userMap) {
//       if (users.length > 1) {
//         // Ordena por ID (ou qualquer outro critério de desempate)
//         const [userToKeep, ...usersToDelete] = users.sort((a, b) => a.id - b.id)

//         // Remover os duplicados
//         for (let user of usersToDelete) {
//           await user.destroyPermanently()
//         }
//       }
//     }
//   })
// }

