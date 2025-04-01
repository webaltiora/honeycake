import { HashRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Footer from './components/layout/Footer';
import './components/styles/global.scss';
import { useScrollAnimation } from './hooks/useScrollAnimation';

function App() {
  useScrollAnimation();

  return (
    <HashRouter>
      <ParallaxProvider>
        <div className="app">
          <Navbar />
          <Home />
          <Footer />
        </div>
      </ParallaxProvider>
    </HashRouter>
  );
}

export default App;
