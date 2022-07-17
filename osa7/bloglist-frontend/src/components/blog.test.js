import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders title and author', () => {
  const blog = {
    title: 'test§12',
    author: 'testqwerty',
    url: 'test.com',
    likes: 43,
    user: {
      name: 'marko',
      username: 'marko123'
    }
  }

  render(<Blog blog={blog} user={blog.user} />)

  const element = screen.getByText('test§12', { exact: false })
  expect(element).toBeDefined()
  const element2 = screen.getByText('testqwerty', { exact: false })
  expect(element2).toBeDefined()
})

test('render url and blogs after clicking title', async () => {
  const blog = {
    title: 'test§12',
    author: 'testqwerty',
    url: 'test.com',
    likes: 4754,
    user: {
      name: 'marko',
      username: 'marko123'
    }
  }


  render(<Blog blog={blog} user={blog.user} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  const element = screen.getByText('test.com', { exact: false })
  expect(element).toBeDefined()
  const element2 = screen.getByText('4754', { exact: false })
  expect(element2).toBeDefined()
})


test('clicking like two times', async () => {
  const blog = {
    title: 'test§12',
    author: 'testqwerty',
    url: 'test.com',
    likes: 0,
    user: {
      name: 'marko',
      username: 'marko123'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={blog.user} addLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)

})

test('testing BlogForm by making a new blog', async () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('write title')
  const author = screen.getByPlaceholderText('write author')
  const url = screen.getByPlaceholderText('write url')
  const sendButton = screen.getByText('create')

  await userEvent.type(title, 'test_title' )
  await userEvent.type(author, 'test_author' )
  await userEvent.type(url, 'test_url' )
  await userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test_title')
  expect(createBlog.mock.calls[0][0].author).toBe('test_author')
  expect(createBlog.mock.calls[0][0].url).toBe('test_url')
})