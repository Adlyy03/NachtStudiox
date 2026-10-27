import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AboutStudio from './components/AboutStudio';
import TrustStatement from './components/TrustStatement';
import Services from './components/Services';
import SelectedWork from './components/SelectedWork';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import Team from './components/Team';
import Faq from './components/Faq';
import ScopeEstimator from './components/ScopeEstimator';
import Footer from './components/Footer';
import TestimonialsPage from './components/TestimonialsPage';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#testimonials') {
        setCurrentPage('testimonials');
      } else if (hash === '#admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    if (pageName === 'testimonials') {
      window.location.hash = '#testimonials';
    } else if (pageName === 'admin') {
      window.location.hash = '#admin';
    } else {
      window.location.hash = '#';
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Lewati ke konten utama
      </a>

      <Navigation onNavigate={navigateTo} currentPage={currentPage} />

      <main id="main-content">
        {currentPage === 'testimonials' && (
          <TestimonialsPage onBackToHome={() => navigateTo('home')} />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard onBackToHome={() => navigateTo('home')} />
        )}

        {currentPage === 'home' && (
          <>
            <Hero />
            <AboutStudio />
            <TrustStatement />
            <Services />
            <SelectedWork onNavigateToAdmin={() => navigateTo('admin')} />
            <WhyUs />
            <Process />
            <Team />
            <Faq />
            <ScopeEstimator />
          </>
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </>
  );
}

export default App;
