const express = require('express')
const faker = require('faker')

const MAX_FILE_SIZE = 100000

const generateFolderContents = (depth = 4, min = 1, max = 5) => {
  if (depth === 0) {
    return []
  }
  const num = Math.floor(Math.random() * (max - min + 1)) + min
  return Array.from(Array(num), () => {
    if (Math.random() > 0.5) {
      return {
        type: 'folder',
        name: faker.hacker.adjective(),
        children: generateFolderContents(depth - 1, 0)
      }
    } else {
      return {
        type: 'file',
        name: faker.system.commonFileName(),
        size: Math.floor(Math.random() * MAX_FILE_SIZE)
      }
    }
  })
}

const app = express()
app.set('json spaces', 2)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.options('/', (req, res) => {
  res.status(200).send('OK')
})

app.get('/', (req, res) => {
  if (Math.random() > 0.1) {
    res.json({ data: generateFolderContents()})
  }
  else {
    res.status(500).json({ error: `Error: failure in ${faker.company.bs()}` })
  }
})

app.get('/*', (req, res) => res.redirect('/'))

const port = parseInt(process.env.PORT, 10) || 3000
app.listen(port, () => console.log(`listening on port ${port}!`))
