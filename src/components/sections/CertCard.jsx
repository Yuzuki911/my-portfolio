import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import { FiAward, FiExternalLink } from 'react-icons/fi'

const CertCard = ({ certification }) => {
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
    >
      <div className="h-40 bg-gradient-to-br from-primary-600 to-accent-700 flex items-center justify-center relative overflow-hidden">
        {/* Animated background pulse */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent-600 to-primary-700"
          animate={{
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${30 + i * 20}%`,
              top: `${40 + i * 10}%`,
            }}
            animate={{
              y: isHovered ? [0, -20, 0] : 0,
              opacity: isHovered ? [0.3, 1, 0.3] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        <motion.div
          style={{ transform: "translateZ(50px)" }}
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? [0, 5, -5, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <FiAward className="text-white text-7xl opacity-20 absolute" />
          <FiAward className="text-white text-6xl" />
        </motion.div>
      </div>

      <div className="p-6" style={{ transform: "translateZ(25px)" }}>
        <motion.h3
          className="text-xl font-bold text-gray-900 dark:text-white mb-2"
          animate={{
            color: isHovered ? "#f2545b" : undefined,
          }}
          transition={{ duration: 0.3 }}
        >
          {certification.name}
        </motion.h3>

        <motion.p
          className="text-primary-600 dark:text-primary-400 font-semibold mb-2"
          animate={{
            x: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {certification.issuer}
        </motion.p>

        <motion.p
          className="text-sm text-gray-600 dark:text-gray-400 mb-4"
          animate={{
            x: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          Issued: {certification.date}
        </motion.p>

        {certification.description && (
          <motion.p
            className="text-sm text-gray-700 dark:text-gray-300 mb-4"
            animate={{
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            {certification.description}
          </motion.p>
        )}

        {certification.credentialId && (
          <motion.p
            className="text-xs text-gray-500 dark:text-gray-500 mb-4"
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            Credential ID: {certification.credentialId}
          </motion.p>
        )}

        {certification.credentialLink && (
          <motion.a
            href={certification.credentialLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium cursor-pointer"
          >
            <motion.div
              animate={{ rotate: isHovered ? 15 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiExternalLink />
            </motion.div>
            View Credential
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}

export default CertCard
