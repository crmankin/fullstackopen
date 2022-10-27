const AnecdoteDetail = ({ anecdote }) => {
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <h3>by {anecdote.author}</h3>
            <p>Has {anecdote.votes} votes.</p>
            <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}

export default AnecdoteDetail
