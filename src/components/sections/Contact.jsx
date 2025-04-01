import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import bgImage from '../../assets/images/hero-bg3.jpg';
import '../styles/contact.scss';
import shopImage from '../../assets/images/shop.jpg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


const Contact = () => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const infoItems = [
    { icon: faMapMarkerAlt, title: "Visit Us", content: "123 Honey Street, Sweet City, 12345" },
    { icon: faPhone, title: "Call Us", content: "+1 (234) 567-8900" },
    { icon: faEnvelope, title: "Email Us", content: "hello@honeycake.com" }
  ];

  const parallaxEffect = (e, depth = 30) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / depth;
    const rotateY = (centerX - x) / depth;

    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  return (
    <section ref={sectionRef} className="contact" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="contact-overlay"></div>
      <div className="geometric-pattern"></div>
      
      <motion.div
        className="contact-content"
        style={{ opacity, y }}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Get in Touch</h2>
          <div className="decorative-line">
            <span className="glow-point"></span>
          </div>
          <p>We'd love to hear from you</p>
        </motion.div>

        <div className="contact-container">
          <motion.div 
            className="shop-image-wrapper"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="shop-image">
              <img src={shopImage} alt="Our Shop" />
              <div className="image-overlay"></div>
            </div>
          </motion.div>

          <motion.div className="contact-info">
          {infoItems.map((item, index) => (
            <motion.div
              key={index}
              className={`info-item ${isHovered === index ? 'hovered' : ''}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={(e) => {
                setIsHovered(null);
                const card = e.currentTarget;
                card.style.transform = 'none';
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                card.style.transform = parallaxEffect(e);
              }}
            >
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <div className="hover-effect"></div>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;