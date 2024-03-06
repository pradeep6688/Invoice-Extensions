// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header';
import Services from './Services'; // Assume you have a Services component
import Contact from './Contact'; // Assume you have a Contact component
import About from './About'; // Assume you have an About component
import BookNow from './components/BookNow';
import TopBar from './TopBar'
import Footer from './Footer';
import './App.css'
import MainBanner from './components/MainBanner';

function App() {
    return (
        <Router>
            <div className="app">
                <TopBar />
                <Header />
                <Routes>
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact"  element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/booknow"  element={<BookNow />} />
                    {/* Fallback route */}
                    <Route path="/" element={<MainBanner />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

