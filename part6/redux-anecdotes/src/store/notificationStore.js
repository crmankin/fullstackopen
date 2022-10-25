import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: "",
  reducers: {
    setNotification(state, action) {
      const content = action.payload
      return content
    },
    clearNotification(state, action) {
      return ""
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
