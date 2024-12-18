import React from 'react';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <div>
            <header>
                <h1>Welcome to Look Over There</h1>
                <nav>
                    <ul>
                        <li><Link to="/search">Search</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <p>Use the navigation above to go to the search page.</p>
            </main>
        </div>
    );
};

export default App;