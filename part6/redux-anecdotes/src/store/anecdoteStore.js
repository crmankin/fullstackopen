import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      const idx = state.findIndex(a => a.id === updatedAnecdote.id)
      state[idx] = updatedAnecdote;
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  }
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdotesService.getAll()
    dispatch(setAnecdotes(data))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const savedAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(savedAnecdote))
  }
}

export const voteForAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    const anecdoteForUpdate = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const savedAnecdote = await anecdotesService.update(anecdoteForUpdate)
    dispatch(updateAnecdote(savedAnecdote))
  }
}

export default anecdoteSlice.reducer
