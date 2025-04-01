import { Parallax } from 'react-scroll-parallax';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaHeart, FaCookie, FaStar } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import '../styles/about.scss';
import bgImage from "../../assets/images/hero-bg3.jpg";

const About = () => {
  const [counting, setCounting] = useState(false);
  const statsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const statsData = [
    { icon: <FaHeart />, value: 5000, label: "Happy Customers", suffix: "+" },
    { icon: <FaCookie />, value: 100, label: "Unique Recipes", suffix: "+" },
    { icon: <FaStar />, value: 4, label: "Average Rating", suffix: "" }
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counting) {
          setCounting(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [counting]);

  useEffect(() => {
    if (counting) {
      statsData.forEach((stat, index) => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = stat.value / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = current;
            return newCounts;
          });
        }, duration / steps);
      });
    }
  }, [counting]);

  return (
    <section 
      className="about" 
      id="about" 
      style={{'--bg-image': `url(${bgImage})`}}
    >
      <div className="particles"></div>
      <div className="about-container">
        <Parallax translateY={[-20, 20]} speed={-5}>
          <motion.div
            className="about-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="about-header" 
              variants={fadeInUp}
            >
              <h2>Our Story</h2>
              <div className="decorative-line">
                <div className="decorative-pattern"></div>
              </div>
            </motion.div>

            <motion.p 
              className="main-text" 
              variants={fadeInUp}
            >
              Founded in 2020, HoneyCake has been crafting delicious pastries
              with love and dedication. Our secret recipes, passed down through
              generations, combine traditional techniques with modern innovation.
            </motion.p>

            <motion.div 
              className="features-grid" 
              variants={containerVariants}
            >
              {['Artisanal Quality', 'Family Heritage', 'Modern Twist'].map((title, index) => (
                <motion.div 
                  key={index}
                  className="feature" 
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 50
                  }}
                >
                  <div className="feature-content">
                    <h3>{title}</h3>
                    <p>{
                      index === 0 ? "Every pastry is handcrafted with premium ingredients and attention to detail." :
                      index === 1 ? "Three generations of baking expertise in every delicious bite." :
                      "Contemporary flavors meeting traditional baking techniques."
                    }</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="stats-container" 
              variants={containerVariants}
              ref={statsRef}
              style={{ opacity, scale }}
            >
              {statsData.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="stat-item"
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 10,
                    z: 50
                  }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <h3>
                    {Math.round(counts[index])}
                    {stat.suffix}
                  </h3>
                  <p>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="cta-section"
              variants={fadeInUp}
            >
              <h3>Ready to Experience Our Delights?</h3>
              <motion.button 
                className="cta-button"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(255, 160, 0, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Menu
              </motion.button>
            </motion.div>
          </motion.div>
        </Parallax>
      </div>
    </section>
  );
};

export default About;