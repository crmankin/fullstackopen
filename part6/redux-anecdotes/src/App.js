import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
  }

  const create = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    dispatch(createAnecdote(content))
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
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input type="text" name="content" placeholder="Enter a new quote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App