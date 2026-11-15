import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Aapke main component ka path
import './index.css' // Global CSS styles (agar hain toh)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)