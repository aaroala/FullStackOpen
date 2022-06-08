import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    console.log(`creating new blog with title "${title}", author "${author}", url "${url}"`)

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={handleCreateBlog}>
      <div>
      title:
        <input
          id="title"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder='write title'
        />
      </div>
      <div>
      author:
        <input
          id="author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='write author'
        />
      </div>
      <div>
      url:
        <input
          id="url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder='write url'
        />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm