import { useState } from 'react'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

import Menu from './components/Menu'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteDetail from './components/AnecdoteDetail'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Footer from './components/Footer'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`Created new anecdote: ${anecdote.content}`)
    setTimeout(() => setNotification(''), 5000)
    navigate('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const match = useMatch("/anecdotes/:id")
  const displayedAnecdote = match ? anecdoteById(Number(match.params.id)) : null
  const navigate = useNavigate()

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <div style={{ marginLeft: 25 }}>
        <Routes>
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route path="/anecdotes/:id" element={<AnecdoteDetail anecdote={displayedAnecdote} />} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
