import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'
import { prisma } from './lib/prisma'
import { z } from 'zod'

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async request => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })
    //aqui estou postando um novo habito, no qual é obrigatorio o titulo e quantos dias da semana ele vai funcionar

    const { title, weekDays } = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        WeekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
        }
      }
    })
  })

  app.get('/day', async request => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(request.query)
    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')

    //pegar todos os habitos possiveis
    //habitos que ja foram completos

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date
        },
        WeekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate()
      },
      include: {
        dayHabits: true
      }
    })

    const completeHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    })

    return {
      possibleHabits,
      completeHabits
    }
  })

//completar e nao completar um habito

app.patch('/habits/:id/toggle', async (request) => {
  //route param => parametro de identificaçao

  const toggleHabitParams = z.object({
    id: z.string().uuid(),

  })
  const {id} = toggleHabitParams.parse(request.params)
  const today = dayjs().startOf('day').toDate()
  let day = await prisma.day.findUnique({
    where: {
      date:today,
    }
  })

  if (!day ) {
    day = await prisma.day.create({
      data:{
        date:today,
      }
    })
  }

const dayHabit =await prisma.dayHabit.findUnique({
  where:{
    day_id_habit_id:{
      day_id:day.id ,
      habit_id: id,

    }
  }
})

if (dayHabit) {
  await prisma.dayHabit.delete({
    where:{
      id: dayHabit.id,
    }
  })

}else {
  await prisma.dayHabit.create({
    data:{
day_id:day.id,
habit_id:id,
    }
  })
}


})

}
