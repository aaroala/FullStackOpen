import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from 'react-redux'

const initialState = ""

const filterSlice = createSlice({
  name: 'filterText',
  initialState,
  reducers: {
    setFilterName(state, action) {
      const content = action.payload
      return content
    },
  },
})

export const { setFilterName } = filterSlice.actions
export default filterSlice.reducer