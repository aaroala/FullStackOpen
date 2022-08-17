const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'SECRET_KEY_HERE'
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      console.log("user", context.currentUser)
      return(context.currentUser)},
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => Author.find({}),
    allBooks: async (root, args) =>  Book.find({}),
    allGenres: async (root, args) => {
      const books = await Book.find({})
      let allGenres = []
      books.map((book) => {
        allGenres = allGenres.concat(book.genres)
      })
      allGenres = [...new Set(allGenres)]
      return allGenres
    },
    booksByGenre: async (root, args) => {
      const books = await Book.find({})

      if (typeof args.genre !== 'string') { return books }

      let filteredBooks = []
      books.map((book) => {
        console.log(book, args.genre)
        if (book.genres.includes(args.genre)) {
          filteredBooks = filteredBooks.concat(book)
        }
      })
      console.log(filteredBooks)
      return filteredBooks
    }
  },
  Author: {
    bookCount: async (root) => (root.books.length)
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author)
      return author
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log("ASD", currentUser)

      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }

      if (args.author.length <= 3) {
        throw new UserInputError("Author's name needs to be longer that 3 characters")
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        console.log(args.author)
        author = new Author({ name: args.author })
        await author.save()
        console.log(author)
      }
      const book = new Book({ ...args, author: author })
      await book.save()

      author.books = author.books.concat(book)
      await author.save()

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }

      let author = await Author.findOne({ name: args.name })
      if (!author) {
        author = new Author({ ...args, born: args.setBornTo})
      } else {
        author.born = args.setBornTo
      }

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers