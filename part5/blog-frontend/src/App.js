import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'


const App = () => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const showNotification = (message, messageType, duration) => {
    setMessage(message);
    setMessageType(messageType);
    setTimeout(() => {
      setMessage(null);
      setMessageType("");
    }, duration);
  };

  return (
    <div>
      <Notification message={message} messageType={messageType} />
      {user === null
        ? <LoginForm setUser={setUser} showNotification={showNotification} />
        : (
          <div><p>Logged in as {user.username}</p>
            <BlogList blogs={blogs} />
          </div>
        )
      }
    </div>
  )
}

export default App
