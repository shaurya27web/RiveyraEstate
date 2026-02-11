import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import CustomCursor from './components/common/Customcursor/Customcursor';
import Home from './pages/Home/Home';
import Properties from './pages/Properties/Properties';
import PropertyDetails from './pages/Properties/Properties';
import Agents from './pages/Agents/Agents';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import './App.css';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Breadcrumb from './components/common/Breadcrumb/Breadcrumb';

function App() {
  return (
    <Router>
      <div className="app">
        <CustomCursor />
        <ScrollToTop></ScrollToTop>
        <Header />
        <Breadcrumb />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;