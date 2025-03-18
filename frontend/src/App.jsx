import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Register from './components/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
