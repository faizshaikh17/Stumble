import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Home />
        <Outlet />
      </div>
    </>
  )
}

export default App
