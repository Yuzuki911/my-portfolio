import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600"
          exit={{
            opacity: 0,
            scale: 1.5,
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo/Initial Animation */}
            <motion.div
              className="relative w-32 h-32 mx-auto mb-8"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-white/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-t-4 border-white"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                animate={{
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img
                  src="./logo.png"
                  alt="Logo"
                  className="w-16 h-16 object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                className="text-white text-xl font-medium"
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Loading
              </motion.span>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageTransition
