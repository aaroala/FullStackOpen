import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notify(state, action) {
      let content = action.payload
      if (content === undefined) {content = null}
      return content
    },
  },
})
export const { notify } = notificationSlice.actions

let timeoutId = null

export const setNotification = (content, type='info', sec=5) => {
  console.log('notification', content, sec, type)

  return dispatch => {
    dispatch(notify(content))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(notify(null))
    }, sec * 1000)
  }
}

export default notificationSlice.reducer