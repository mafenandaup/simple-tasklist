import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Tasktab from './pages/tasktab'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tasktab />
  </StrictMode>,
)

