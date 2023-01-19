import Fastify from 'fastify'
//framework, parecido com o express,usado para microserviços
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'

const app = Fastify()
//criando a aplicaçao, rodando o fastify
const prisma = new PrismaClient()

app.register(cors)
//cors mecanismo de segurança, permite que a aplicaçao front end acesse o back

app.get('/hello', async () => {
  const habits = await prisma.habit.findMany()
  return habits
})
//aqui esta a rota
app
  .listen({
    port: 3333
  })
  .then(() => {
    console.log('HTTP Server runnig!')
  })
//metodo listen para que aplicaçao "ouça" a porta (passei a porta em formato de objeto)
