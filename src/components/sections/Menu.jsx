import { motion, useAnimation, useTransform, useScroll } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import bgImage from '../../assets/images/hero-bg4.jpg';
import classicHoney from '../../assets/images/classic-honey.jpeg';
import lavenderDream from '../../assets/images/lavender-dream.jpeg';
import chocolateHoney from '../../assets/images/chocolate-honey.jpeg';
import berryHoney from '../../assets/images/berry-honey.jpeg';
import '../styles/menu.scss';

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const startTime = Date.now();
          const timer = setInterval(() => {
            const currentTime = Date.now();
            const progress = (currentTime - startTime) / duration;
            
            if (progress >= 1) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(end * progress));
            }
          }, 16);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count}</span>;
};

const MenuItem = ({ name, price, description, image, index, rating, reviews }) => {
  const cardRef = useRef(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // 3D Card Animation
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `
      perspective(1000px) 
      rotateX(${-rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(1.05, 1.05, 1.05)
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(0deg) 
      rotateY(0deg) 
      scale3d(1, 1, 1)
    `;
    setIsHovered(false);
  };

  // Parallax Effect for Card Content
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={cardRef}
      className="menu-item"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ y }}
    >
      <div className="geometric-pattern"></div>
      <motion.div 
        className="image-container"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img src={image} alt={name} />
        <div className="overlay"></div>
        <div className="rating">
          {rating} ★ (<Counter end={reviews} duration={2000} /> reviews)
        </div>
      </motion.div>

      <motion.div 
        className="content"
        style={{ 
          transform: isHovered ? 'translateZ(50px)' : 'translateZ(0px)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          {name}
        </motion.h3>
        
        <motion.div 
          className="price-tag"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 + 0.4 }}
        >
          <span className="currency">$</span>
          <span className="amount">{price}</span>
        </motion.div>

        <motion.p 
          className="description"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.5 }}
        >
          {description}
        </motion.p>

        <motion.button 
          className="order-button"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(255, 160, 0, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Order Now
          <span className="button-shine"></span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const Menu = () => {
  const menuItems = [
    {
      name: "Classic Honey Cake",
      price: "24.99",
      description: "Our signature cake made with organic honey and natural ingredients, perfectly balanced sweetness",
      image: classicHoney,
      rating: 4.8,
      reviews: 127
    },
    {
      name: "Tiramisu",
      price: "27.99",
      description: "A rich and creamy Italian dessert featuring layers of coffee-soaked ladyfingers, mascarpone cheese, and a dusting of cocoa powder.",
      image: lavenderDream,
      rating: 4.9,
      reviews: 184
    },
    {
      name: "Club Sandwich",
      price: "26.99",
      description: "A classic triple-layered sandwich packed with tender chicken, crisp lettuce, juicy tomatoes, and a spread of mayonnaise.",
      image: chocolateHoney,
      rating: 4.7,
      reviews: 156
    },
    {
      name: "Cheeseburger",
      price: "28.99",
      description: "A juicy beef patty topped with melted cheese, fresh lettuce, and tomato, served in a soft sesame seed bun.",
      image: berryHoney,
      rating: 4.9,
      reviews: 203
    },
  ];

  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="menu-section" style={{'--bg-image': `url(${bgImage})`}}>
      <div className="animated-background"></div>
      <Parallax translateY={[-20, 20]}>
        <div className="menu-container">
          <motion.div
            style={{ y: headerY }}
            className="header-content"
          >
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Specialties
            </motion.h2>
            <div className="decorative-line">
              <div className="glow"></div>
            </div>
          </motion.div>

          <div className="menu-grid">
            {menuItems.map((item, index) => (
              <MenuItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </Parallax>
    </section>
  );
};

export default Menu;