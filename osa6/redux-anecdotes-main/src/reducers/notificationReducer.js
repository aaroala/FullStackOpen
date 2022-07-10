import { createSlice } from "@reduxjs/toolkit"
import { useEffect } from "react"

const initialState = null

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

export const setNotification = (content, sec) => {
  console.log("notification", content, sec)

  return async dispatch => {
    const timer = setTimeout(() => {
      dispatch(notify(null))
    }, sec * 1000)
    console.log(timer)
    await dispatch(notify(content))
  }
}

export const { notify } = notificationSlice.actions
export default notificationSlice.reducer