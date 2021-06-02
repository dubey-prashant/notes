
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
