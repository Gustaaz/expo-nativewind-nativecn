import { database } from "@/database"
import { ProcessModel, ScheduleModel } from "@/database/model"
import { Q } from "@nozbe/watermelondb"


export const getAllSchedules = async (email: string) => {

  const schedules = await database
    .get<ScheduleModel>('schedules')
    .query(Q.where('email', email))
    .fetch()

  const processIds = schedules.map((schedule) => schedule._id)
  const processes = await database
    .get<ProcessModel>('processes')
    .query(Q.where('agendamento_id', Q.oneOf(processIds)))
    .fetch()

  const schedulesWithProcesses = schedules.map((schedule) => {
    const process = processes.filter(
      (process) => process.agendamento_id === schedule._id
    )
    return {
      _id: schedule._id,
      email: schedule.email,
      data_agendamento_at: schedule.data_agendamento_at,
      nome: schedule.nome,
      created_at: new Date(schedule.created),
      process
    }
  })

  return schedulesWithProcesses
}
