// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header';
import Services from './Services'; // Assume you have a Services component
import Contact from './Contact'; // Assume you have a Contact component
import About from './About'; // Assume you have an About component
import BookNow from './components/BookNow';
import './App.css'
import MainBanner from './components/MainBanner';

function App() {
    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className='App'>
                <Header />
                <main style={{ flex: 1 }}>
                <Routes>
                     <Route path="/" element={<MainBanner />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact"  element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/booknow"  element={<BookNow />} />
                    {/* Fallback route */}
                   
                </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

