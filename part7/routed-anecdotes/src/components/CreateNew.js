import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
    }

    const handleReset = (e) => {
        e.preventDefault()
        content.reset();
        author.reset();
        info.reset();
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content.field} />
                </div>
                <div>
                    author
                    <input {...author.field} />
                </div>
                <div>
                    url for more info
                    <input {...info.field} />
                </div>
                <button>create</button>
                <button onClick={handleReset}>reset</button>
            </form>
        </div>
    )

}

export default CreateNew
