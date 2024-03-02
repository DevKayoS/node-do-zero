// import {createServer} from 'node:http'

// const server = createServer((request, response)=>{
//   response.write('hello world')
  
//   return response.end()
// })

// server.listen(3333) 


import {fastify} from 'fastify'
// import {DataBaseMemory} from './database-memory.js'
import { DataBasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DataBaseMemory()
const database = new DataBasePostgres()

process.on('uncaughtException', function (err) {
  console.log(err);
});

server.post('/videos', async (request, response)=> {

 
    const {title, description, duration} = request.body

    await database.create({
    title, 
    description ,
    duration,
  })

  return response.status(201).send()
    
  
})

server.get('/videos', async (request)=> {
  const search = request.query.search
  
  const videos = database.list(search)


  console.log(videos)
  return videos
})

server.put('/videos/:id', async (request, response)=> {
  const videoId = request.params.id 
  const {title, description, duration} = request.body
  
 await database.update(videoId, {
    title,
    description,
    duration  
  })

  return response.status(204).send()
})

server.delete('/videos/:id', async (request, response)=> {
  const videoId = request.params.id

  await database.delete(videoId)

  return response.status(204).send()
})



server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})