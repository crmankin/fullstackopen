import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteStore from './store/anecdoteStore'
import notificationStore from './store/notificationStore'
import filterStore from './store/filterStore'
import App from './App'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteStore,
    notifications: notificationStore,
    filter: filterStore
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
