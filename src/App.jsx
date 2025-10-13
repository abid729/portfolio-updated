import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import ContactWithDatabase from './components/ContactWithDatabase';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import useVisitorTracking from './hooks/useVisitorTracking';

function MainApp() {
  // Automatically track visitors
  useVisitorTracking();

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <ContactWithDatabase />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

