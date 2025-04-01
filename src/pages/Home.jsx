import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Menu from '../components/sections/Menu';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <main className="home">
      <Hero />
      <About />
      <Menu />
      <Contact />
    </main>
  );
};

export default Home;