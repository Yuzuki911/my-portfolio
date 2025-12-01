import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cursor Style Options:
// 'dot-ring' - Classic dot with expanding ring
// 'spotlight' - Large circular spotlight effect (default)
// 'arrow' - Custom arrow pointer with trail
// 'particle' - Particle explosion effect

const CustomCursor = ({ style = 'spotlight' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updateMousePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Add trail effect for particle style
      if (style === 'particle') {
        setTrail((prev) => [...prev.slice(-5), { ...newPosition, id: Date.now() }]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [style]);

  // Dot-Ring Style
  if (style === 'dot-ring') {
    return (
      <>
        {/* Outer Ring */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          animate={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 28,
          }}
        >
          <div
            className={`w-10 h-10 rounded-full border-2 transition-colors duration-200 ${
              isHovering
                ? 'border-primary-500'
                : 'border-primary-400/50'
            }`}
          />
        </motion.div>

        {/* Inner Dot */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          animate={{
            x: mousePosition.x - 3,
            y: mousePosition.y - 3,
          }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 20,
          }}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${
            isClicking ? 'bg-accent-500 scale-150' : 'bg-primary-500'
          } transition-all duration-100`} />
        </motion.div>
      </>
    );
  }

  // Spotlight Style
  if (style === 'spotlight') {
    return (
      <>
        {/* Main Spotlight */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          animate={{
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            scale: isClicking ? 0.85 : isHovering ? 1.3 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <div
            className={`w-20 h-20 rounded-full border-2 backdrop-blur-sm transition-all duration-200 ${
              isHovering
                ? 'border-primary-500 bg-primary-500/10 shadow-[0_0_30px_rgba(242,84,91,0.3)]'
                : 'border-primary-400/30 bg-primary-400/5'
            }`}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-br from-primary-400/20 to-accent-400/20"
              animate={{
                opacity: isHovering ? 1 : 0.3,
              }}
            />
          </div>
        </motion.div>

        {/* Center dot */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          animate={{
            x: mousePosition.x - 2,
            y: mousePosition.y - 2,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 20,
          }}
        >
          <div className={`w-1 h-1 rounded-full ${
            isClicking ? 'bg-accent-500 scale-150' : 'bg-primary-500'
          } transition-all duration-100`} />
        </motion.div>

        {/* Pulse effect when clicking */}
        <AnimatePresence>
          {isClicking && (
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9998]"
              initial={{ x: mousePosition.x - 20, y: mousePosition.y - 20, scale: 1, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-10 h-10 rounded-full border-2 border-primary-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Arrow Style
  if (style === 'arrow') {
    return (
      <>
        {/* Arrow cursor */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 35,
            mass: 0.4,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`${isHovering ? 'drop-shadow-[0_0_8px_rgba(242,84,91,0.6)]' : ''}`}
          >
            <path
              d="M4 4L20 12L12 14L10 22L4 4Z"
              fill={isHovering ? '#f2545b' : '#a93f55'}
              stroke="white"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      </>
    );
  }

  // Particle Style
  if (style === 'particle') {
    return (
      <>
        {/* Main cursor */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          animate={{
            x: mousePosition.x - 15,
            y: mousePosition.y - 15,
            scale: isClicking ? 1.5 : isHovering ? 1.2 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          <div
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
              isHovering
                ? 'border-primary-500 bg-primary-500/20'
                : 'border-primary-400/50 bg-primary-400/10'
            }`}
          />
        </motion.div>

        {/* Particle trail */}
        <AnimatePresence>
          {trail.map((pos, i) => (
            <motion.div
              key={pos.id}
              className="fixed top-0 left-0 pointer-events-none z-[9998]"
              initial={{
                x: pos.x - 3,
                y: pos.y - 3,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                scale: 0,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: `rgba(242, 84, 91, ${1 - i * 0.15})`,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Explosion particles on click */}
        <AnimatePresence>
          {isClicking &&
            [...Array(8)].map((_, i) => (
              <motion.div
                key={`explosion-${i}`}
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                initial={{
                  x: mousePosition.x - 2,
                  y: mousePosition.y - 2,
                  opacity: 1,
                }}
                animate={{
                  x: mousePosition.x + Math.cos((i * Math.PI) / 4) * 30 - 2,
                  y: mousePosition.y + Math.sin((i * Math.PI) / 4) * 30 - 2,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-1 h-1 rounded-full bg-accent-500" />
              </motion.div>
            ))}
        </AnimatePresence>
      </>
    );
  }

  return null;
};

export default CustomCursor;
