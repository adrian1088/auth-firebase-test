import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Importing the Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
