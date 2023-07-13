const express = require('express')
const users = require('./state')
const PORT = process.env.PORT || 444

const app = express()
app.use(express.json())

app.get('/', (req,res) => {
  res.json({
    message: "Welcome to the jungle!"
  })
})
// Get all users
app.get('/users', (req,res) => {
  res.json(users)
})

// Get one user
app.get('/users/:id', (req,res) => {
  const {id} = req.params.id
  const user = users.find((user) => user.id == id)
  res.json(user)
})

// Create a user
app.post('/users', (req,res) => {
  const user = req.body

  users.push(user)
  res.json(user)
})

// Update a user
app.put('/users/:id', (req,res) => {
  const {id} = req.params
  const updates = req.body

  const user = users.find((user) => user.id == id)
  const userIndex = users.findIndex((user) => user.id == id)

  const updatedUser = {
    ...user,
    ...updates
  }

  users.splice(userIndex, 1, updatedUser)

  res.json(user)
})

// Delete a user
app.delete('/users/:id', (req,res) => {
  const {id} = req.params

  const user = users.find((user) => user.id == id)
  const userIndex = users.findIndex((user) => user.id == id)

  users.splice(userIndex, 1)

  res.json(users)
})

app.listen(444, () => {
  console.log(`Listening on port ${PORT}!`)
})