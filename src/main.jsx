import React from 'react'
import ReactDOM from 'react-dom'
import Grade from 'grade-js';
import './index.css'
import App from './App'

// Gradient generator library
window.addEventListener('load', () => {
  Grade(document.querySelectorAll('.gradient-wrap'));
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
