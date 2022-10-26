import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: "",
  messageId: 0
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage(state, action) {
      const messageId = action.payload
      if (messageId === state.messageId) {
        return initialState
      }
    },
    clearAnyMessage(state, action) {
      return initialState
    }
  }
})

export const { setMessage, removeMessage, clearAnyMessage } = notificationSlice.actions

export const showNotification = (message, durationInSeconds) => {
  return async (dispatch, getState) => {
    const state = getState().notification
    if (state.messageId) clearTimeout(state.messageId)
    const messageId = setTimeout(() => {
      dispatch(removeMessage(messageId))
    }, durationInSeconds * 1000)
    dispatch(setMessage({ message, messageId }))
  }
}


export default notificationSlice.reducer
