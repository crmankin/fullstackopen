import { connect } from 'react-redux'
import { createAnecdote } from '../store/anecdoteStore'
import { showNotification } from '../store/notificationStore'

const AnecdoteForm = ({ createAnecdote, showNotification }) => {

  const create = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';

    createAnecdote(content)
    showNotification(`Added new anecdote "${content}"`, 5)
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

const mapDispatchToProps = {
  createAnecdote,
  showNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
