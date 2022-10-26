import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../store/anecdoteStore'
import { showNotification } from '../store/notificationStore'

const AnectdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const shownAnecdotes = useSelector(state => filter ? state.anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())) : [...state.anecdotes])
  shownAnecdotes.sort((a, b) => b.votes - a.votes)
  

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
    dispatch(showNotification(`Voted for anecdote ID: ${id}`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {shownAnecdotes.map(anecdote =>
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
