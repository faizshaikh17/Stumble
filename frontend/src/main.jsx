import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Register } from './components/Register'

const router = createBrowserRouter([
  {
    path: `/`,
    element: <App />,
    children: [
      {
        path: `/users/signup`,
        element: (
          // <AuthLayout authentication={false}>
          <Register />
          // </AuthLayout>
        )
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
