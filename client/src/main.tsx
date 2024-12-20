import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Profile from './pages/Profile.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/AboutUs',
        element: <AboutUs />
      },
      {
        path: '/Profile',
        element: <Profile />
      },
      {
        path: '/AboutUs',
        element: <AboutUs />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />)