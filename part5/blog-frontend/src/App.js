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
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('BlogUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
    }
  }, []);

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
      <LoginForm user={user} setUser={setUser} showNotification={showNotification} />
      {user !== null && <BlogList blogs={blogs} />}
    </div>
  )
}

export default App
