import { database } from "@/database"
import UserModel from "@/database/model/userModel"
import { Surveyor } from "@/types/surveyor"
import { User } from "@/types/user"

type NewUser = {
    user: User
    surveyor: Surveyor
  }
export async function newUser({ surveyor, user }: NewUser) {
    await database.write(async () => {
      await database.get<UserModel>('users').create((users) => {
        users._id = surveyor.idusuario
        users.email = user.email
        users.password = user.password
        users.idusuario = surveyor.idusuario
        users.nome = surveyor.nome
        users.idlotacao = surveyor.idlotacao
        users.descricaolotacao = surveyor.descricaolotacao
        users.siglalotacao = surveyor.siglalotacao
        users.cpf = surveyor.cpf
      })
    })
  }