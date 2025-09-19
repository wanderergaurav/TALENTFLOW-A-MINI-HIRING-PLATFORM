import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import server from "./server"; // Import the server
import db from './db'; // Import the db setup

// Conditionally start the mock server in development
if (import.meta.env.DEV) {
  db.open().catch(err => console.error("Failed to open db: " + err.stack));
  server();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
