import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, Route, Routes } from 'react-router-dom';
import { isMobileDevice } from './utils/deviceType';
import Home from "./pages/Home.tsx";
import MobileHomePage from './pages/MobileHomePage.tsx';
import About from "./pages/AboutUs.tsx";
import MobileAboutPage from './pages/MobileAboutUs.tsx';
import Profile from "./pages/Profile.tsx";
import MobileProfilePage from './pages/MobileProfilePage.tsx';
import Navbar from './components/Navbar.jsx';
import React from "react";

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const isMobile = isMobileDevice();

  return (
      <ApolloProvider client={client}>
            <Routes>
                <Route path="/" element={isMobile ? <MobileHomePage /> : <Home />} />
                <Route path="/AboutUs" element={isMobile ? <MobileAboutPage /> : <About />} />
                <Route path="/Profile" element={isMobile ? <MobileProfilePage /> : <Profile />} />
                <Route path="/login" element={<Outlet />} />
                <Route path="/signup" element={<Outlet />} />
                {/* Add other routes here */}
            </Routes>
            <Navbar />
      </ApolloProvider>
  );
};

export default App;
