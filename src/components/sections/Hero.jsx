import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import { SITE_CONFIG } from '../../utils/constants'
import Button from '../ui/Button'

const Hero = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  const nameLetters = SITE_CONFIG.name.split('')

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-cornsilk via-white to-papaya dark:from-dark-bg dark:via-dark-bg dark:to-dark-card">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Additional Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-smoky-500/10 rounded-full blur-2xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y, opacity }}
      >
        <motion.div
          variants={itemVariants}
          className="mb-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium cursor-pointer inline-block">
            Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.4
              }
            }
          }}
        >
          {nameLetters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block bg-gradient-to-r from-primary-700 to-accent-700 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent"
              style={{ WebkitTextFillColor: 'transparent' }}
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, 0],
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 max-w-2xl mx-auto"
        >
          {SITE_CONFIG.tagline}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto"
        >
          {SITE_CONFIG.bio.split('.')[0]}.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={scrollToProjects} size="lg">
              View My Work
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={scrollToContact} variant="outline" size="lg">
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20"
        >
          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.1 }}
            className="inline-flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 cursor-pointer"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FiArrowDown className="text-2xl" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
