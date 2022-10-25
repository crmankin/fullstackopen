import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../store/anecdoteStore'
import { setNotification, clearNotification } from '../store/notificationStore'

const AnectdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => [...state.anecdotes].sort((a, b) => b.votes - a.votes))

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
    dispatch(setNotification(`Voted for anecdote ID: ${id}`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnectdoteList
