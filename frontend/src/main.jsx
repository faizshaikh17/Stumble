import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: `/`,
    element: <App />,
    children: [
      // {
      //   path: `/`,
      //   element: <Home />
      // }
      // ,
      {
        path: `/users/signup`,
        element: (
          // <AuthLayout authentication={false}>
          <Register />
          // </AuthLayout>
        )
      },
      {
        path: `/login`,
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
