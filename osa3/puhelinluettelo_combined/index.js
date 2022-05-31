/* eslint-disable no-unused-vars */
require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

const persons = []

app.get('/', (request, response) => {
  request.send('<h1>API</h1>')
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(body)

  if (persons.find(person => person.name === body.name)){
    return response.status(400).json({ error: 'person already exists' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson =>
    {response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {

  Person.find({}).then(persons => {
    console.log(persons)
    response.json(persons)
  })
})


app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(person => {
      console.log(person, 'person')
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.get('/api/info', (request, respose, next) => {
  Person.count({})
    .then(count => {
      respose.send(`<p>Phonebook has info for ${count} people</p>
        <p>${new Date().toLocaleString()}</p>`)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

