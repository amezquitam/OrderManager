import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './api/test.js'

createRoot(document.getElementById('root')).render(
    <App />
)

console.log("testing")
let usuarios = [
  { username: 'admin', password: 'admin123', role: 'administrador', activo: true },
  { username: 'mesero1', password: 'mesero123', role: 'mesero', activo: true },
  { username: 'cocinero1', password: 'cocina123', role: 'cocinero', activo: true },
];
