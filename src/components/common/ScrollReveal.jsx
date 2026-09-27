import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 35,
  className = '',
  once = true,
  scale = 1
}) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, x: 0, scale: scale !== 1 ? scale : 1 };
      case 'down':
        return { opacity: 0, y: -distance, x: 0, scale: scale !== 1 ? scale : 1 };
      case 'left':
        return { opacity: 0, x: distance, y: 0, scale: scale !== 1 ? scale : 1 };
      case 'right':
        return { opacity: 0, x: -distance, y: 0, scale: scale !== 1 ? scale : 1 };
      case 'zoom':
        return { opacity: 0, scale: 0.9, y: 15, x: 0 };
      case 'fade':
      default:
        return { opacity: 0, y: 0, x: 0, scale: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = '', delayChildren = 0.1, staggerChildren = 0.12 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', direction = 'up', distance = 30 }) {
  const getVariants = () => {
    const hidden = { opacity: 0 };
    if (direction === 'up') hidden.y = distance;
    if (direction === 'down') hidden.y = -distance;
    if (direction === 'left') hidden.x = distance;
    if (direction === 'right') hidden.x = -distance;
    if (direction === 'zoom') hidden.scale = 0.92;

    return {
      hidden,
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.55,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    };
  };

  return (
    <motion.div variants={getVariants()} className={className}>
      {children}
    </motion.div>
  );
}