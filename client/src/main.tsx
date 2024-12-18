import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import SearchPage from './pages/search';
import './index.css';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>);