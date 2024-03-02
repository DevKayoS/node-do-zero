import {sql} from './db'

sql`
  CREATE TABLE videos (
    title       TEXT,
    description TEXT,
    duration    INTEGER
  )
`.then(() => {
  console.log('Tabela Criada!')
})