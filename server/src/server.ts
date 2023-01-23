import Fastify from 'fastify'
//framework, parecido com o express,usado para microserviços

import cors from '@fastify/cors'
import { appRoutes } from './routes'

const app = Fastify()
//criando a aplicaçao, rodando o fastify

app.register(cors)
//cors mecanismo de segurança, permite que a aplicaçao front end acesse o back

app.register(appRoutes)

app
  .listen({
    port: 3333,
    host:'0.0.0.0'
  })
  .then(() => {
    console.log('HTTP Server runnig!')
  })
//metodo listen para que aplicaçao "ouça" a porta (passei a porta em formato de objeto)
