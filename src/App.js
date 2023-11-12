// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header';
import MainBanner from './MainBanner';
import Services from './Services'; // Assume you have a Services component
import Contact from './Contact'; // Assume you have a Contact component
import About from './About'; // Assume you have an About component
import BookNow from './BookNow';
import TopBar from './TopBar'
import Footer from './Footer';
import './App.css'

function App() {
    return (
        <Router>
            <div className="app">
                <TopBar />
                <Header />
                <main className="content">
                <Routes>
                    <Route path="/" exact component={MainBanner} />
                    <Route path="/services" component={Services} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/about" component={About} />
                    <Route path="/booknow" component={BookNow} />
                    {/* Add additional Routes here */}
                </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

