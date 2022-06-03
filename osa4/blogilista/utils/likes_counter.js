const totalLikes = (blogs) => {
  const total = blogs.reduce(function(sum, blog) {
    return sum + blog.likes
  }, 0)
  return total
}

const favouriteBlog = (blogs) => {
  const mostLikes = blogs.reduce(function(max, blog) {
    return max.likes > blog.likes ? max : blog
  })
  return mostLikes
}

const mostBlogs = (blogs) => {
  const authors = []
  blogs.filter(blog => {
    authorData = authors.find(author => author.author === blog.author)
    if (!authorData) authors.push({'author': blog.author, 'blogs': 1})
    else authorData['blogs'] += 1
  })

  const mostBlogs = authors.reduce(function(max, data) {
    return max.blogs > data.blogs ? max : data
  })
  return mostBlogs
}

const mostLikes = (blogs) => {
  const authors = []
  blogs.filter(blog => {
    authorData = authors.find(author => author.author === blog.author)
    if (!authorData) authors.push({'author': blog.author, 'likes': blog.likes})
    else authorData['likes'] += blog.likes
  })

  const mostLikes = authors.reduce(function(max, data) {
    return max.likes > data.likes ? max : data
  })
  return mostLikes
}


module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}