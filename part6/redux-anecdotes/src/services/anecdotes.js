import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const obj = {
        content,
        votes: 0
    }
    const response = await axios.post(baseUrl, obj)
    return response.data
}

const update = async (updateAnecdote) => {
    const response = await axios.put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote)
    return response.data
}

const anecdotesService = {
    getAll, createNew, update
}

export default anecdotesService;
