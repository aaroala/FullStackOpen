import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import currentUserReducer from './reducers/currentUserReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notificationReducer,
    currentUser:  currentUserReducer,
    users: userReducer
  }
})

export default store