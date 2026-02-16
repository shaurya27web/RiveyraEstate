import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import Breadcrumb from './components/common/Breadcrumb/Breadcrumb';

// Utility Components
import CustomCursor from './components/common/Customcursor/Customcursor';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import PageTransition from './components/Animations/PageTransition';

// Pages
import Home from './pages/Home/Home';
import Properties from './pages/Properties/Properties';
import Agents from './pages/Agents/Agents';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import PropertyDetails from './pages/Properties/PropertyDetails';
import AdminDashboard from './pages/Admin/AdminDashboard';

// Admin Route Protection
import PrivateRoute from './components/Admin/PrivateRoutes';
import Login from './pages/Admin/Login';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Global Components */}
        <CustomCursor />
        <ScrollToTop />
        
        {/* Header - Always Visible */}
        <Header />
        
        {/* Breadcrumb - Shows on all pages except home */}
        <Breadcrumb />
        
        {/* Main Content with Page Transitions */}
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                } 
              />
              <Route 
                path="/properties" 
                element={
                  <PageTransition>
                    <Properties />
                  </PageTransition>
                } 
              />
             <Route 
  path="/properties/:id" 
  element={
    <PageTransition>
      <PropertyDetails />
    </PageTransition>
  } 
/>
              <Route 
                path="/agents" 
                element={
                  <PageTransition>
                    <Agents />
                  </PageTransition>
                } 
              />
              <Route 
                path="/about" 
                element={
                  <PageTransition>
                    <About />
                  </PageTransition>
                } 
              />
              <Route 
                path="/contact" 
                element={
                  <PageTransition>
                    <Contact />
                  </PageTransition>
                } 
                
              />
              <Route 
  path="/admin" 
  element={
    <PrivateRoute>
      <PageTransition>
        <AdminDashboard />
      </PageTransition>
    </PrivateRoute>
  } 
/>
<Route 
  path="/admin/login" 
  element={
    <PageTransition>
      <Login />
    </PageTransition>
  } 
/>
            </Routes>
          </AnimatePresence>
        </main>
        
        {/* Footer - Always Visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;