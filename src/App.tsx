import { useEffect } from 'react'
import './App.css'
import Home from './pages/home/Home'
import { appWindow } from '@tauri-apps/api/window'

function App() {
  useEffect(() => {
    window.addEventListener('blur', () => {
      appWindow.hide()
    })
  })

  return (
    <div className='home-container'>
      <Home />
    </div>
  )
}

export default App
