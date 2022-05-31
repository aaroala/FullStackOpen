/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

console.log(name, number)


const url =
  `mongodb+srv://admin:${password}@cluster0.4mot0iu.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name === undefined || number === undefined) {
  Person
    .find({})
    .then(people => {
      people.forEach(person => {
        console.log(person)})
      mongoose.connection.close()
    })


} else {

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number  ${number} to phonebook`)
    mongoose.connection.close()
  })
}