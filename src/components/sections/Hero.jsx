import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import '../styles/hero.scss';
import heroBg from '../../assets/images/hero-bg2.jpg';

// Import cake images
import cake1 from '../../assets/images/Hero/1.jpeg';
import cake2 from '../../assets/images/Hero/2.jpeg';
import cake3 from '../../assets/images/Hero/3.jpeg';
import cake4 from '../../assets/images/Hero/4.jpeg';
import cake5 from '../../assets/images/Hero/5.jpeg';
import cake6 from '../../assets/images/Hero/6.jpeg';
import cake7 from '../../assets/images/Hero/7.jpeg';
import cake8 from '../../assets/images/Hero/8.jpeg';
import cake9 from '../../assets/images/Hero/9.jpeg';
import cake10 from '../../assets/images/Hero/10.jpeg';





const Hero = () => {
  const ref = useRef(null);
  const [showGallery, setShowGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const cakeImages = [
    cake1,
    cake2,
    cake3,
    cake4,
    cake5,
    cake6,
    cake7,
    cake8,
    cake9,
    cake10
  ];

  // 3D Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (showGallery) return;
      
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const rotateX = (clientY - centerY) / 50;
      const rotateY = (centerX - clientX) / 50;

      const content = document.querySelector('.hero-content');
      if (content) {
        content.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showGallery]);

  const honeycombVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const navigateSlides = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex >= cakeImages.length) newIndex = 0;
      if (newIndex < 0) newIndex = cakeImages.length - 1;
      return newIndex;
    });
  };

  return (
    <section ref={ref} className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
      <motion.div className="parallax-bg" style={{ y, opacity }} />
      <div className="bg-overlay"></div>
      
      <AnimatePresence initial={false} custom={direction}>
        {!showGallery ? (
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div className="content-wrapper">
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="highlight">Honey</span> Cake Delights
              </motion.h1>
              
              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Handcrafted with love and honey
              </motion.p>

              <div className="button-group">
                <motion.button
                  className="hero-cta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(255, 160, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="button-text">Order Now</span>
                  <span className="button-shine"></span>
                </motion.button>

                <motion.button
                  className="hero-cta gallery-btn"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(255, 160, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGallery(true)}
                >
                  <span className="button-text">View Gallery</span>
                  <span className="button-shine"></span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="hero-gallery"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="gallery-content">
              <motion.img 
                key={currentIndex}
                src={cakeImages[currentIndex]}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.3 }}
                alt={`Cake ${currentIndex + 1}`}
              />
              <div className="gallery-controls">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigateSlides(-1)}
                >
                  &lt;
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowGallery(false)}
                >
                  Back
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigateSlides(1)}
                >
                  &gt;
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="accent-elements">
        {[...Array(6)].map((_, index) => (
          <motion.div 
            key={index}
            className={`accent-hexagon hex-${index + 1}`}
            variants={honeycombVariants}
            animate="animate"
            style={{ 
              animationDelay: `${index * 0.2}s`,
              rotate: index * 60 
            }}
          />
        ))}
      </div>

      <div className="floating-particles">
        {[...Array(20)].map((_, index) => (
          <div 
            key={index}
            className="particle"
            style={{
              '--delay': `${index * 0.5}s`,
              '--position': `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="honey-drips">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="honey-drip">
            <div className="drip-body"></div>
            <div className="drip-drop"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;