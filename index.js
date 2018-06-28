const express = require('express')
const faker = require('faker')

const generateFolderContents = (depth = 3, min = 1, max = 3) => {
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
        name: faker.hacker.noun()
      }
    }
  })
}

const app = express()

app.get('/', (req, res) => {
  res.json({ data: generateFolderContents()})
})

app.get('/*', (req, res) => res.redirect('/'))

const port = parseInt(process.env.PORT, 10) || 3000
app.listen(port, () => console.log(`listening on port ${port}!`))
