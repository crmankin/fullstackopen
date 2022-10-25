import { useDispatch } from 'react-redux'
import { createAnecdote } from '../store/anecdoteStore'

const AnectdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input type="text" name="content" placeholder="Enter a new quote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnectdoteForm
