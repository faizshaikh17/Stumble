import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Register from './components/Register'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login.jsx'

const router = createBrowserRouter([
  {
    path: `/`,
    element: <App />,
    children: [
      {
        path: `/users/register`,
        element: <Register />,
      },
      {
        path: `/users/login`,
        element: <Login />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
