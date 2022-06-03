const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {request.token = null}

  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id) {
      const user = await User.findById(decodedToken.id)
      request.user = user
    } else {request.user = null}
    console.log(request.user, "user")
  }
  next()
}

module.exports ={ tokenExtractor, userExtractor }