import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'

import Profile from './pages/Profile.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Home from './pages/Home.jsx'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import TestPage from './pages/test.jsx'
import GPSLocation   from "./components/GPS.tsx";
import NearbySearch from './pages/nearbySearch.jsx'
import NearbyTest from "./pages/nearbytest.tsx";
import Explore from "./pages/Explore.tsx";
import './Styles/index.css'


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
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/signup',
        element: <Signup/>,
      },
      {
        path: '/test',
        element: <TestPage />,
       },
      {
        path: '/GPSLocation',
        element: <GPSLocation/>,
      },
      {
        path: '/nearbySearch',
        element: <NearbySearch />
      },
      {
        path: '/nearbyTest',
        element: <NearbyTest/>
      },
      {
        path: '/explore',
        element: <Explore />

      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />)