import { database } from "@/database"
import UserModel from "@/database/model/userModel"
import { User } from "@/types/user"
import { Q } from "@nozbe/watermelondb"

export async function getUser(data: User) {
  const existingUser = await database
    .get<UserModel>('users')
    .query(Q.where('email', data.email), Q.where('password', data.password))
    .fetch()
  return existingUser[0]
}
