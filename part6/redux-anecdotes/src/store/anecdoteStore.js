import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteForAnecdote(state, action) {
      const id = action.payload
      const anecdoteToUpdate = state.find(a => a.id === id)
      anecdoteToUpdate.votes += 1
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  }
})

export const { voteForAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdotesService.getAll()
    dispatch(setAnecdotes(data))
  }
}


export default anecdoteSlice.reducer
