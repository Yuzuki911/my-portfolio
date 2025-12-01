import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import * as SiIcons from 'react-icons/si'
import * as FaIcons from 'react-icons/fa'

const SkillCard = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false)
  const IconComponent = SiIcons[skill.icon] || FaIcons[skill.icon]

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

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
      className="relative flex flex-col items-center justify-center p-6 bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-accent-400/20 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: isHovered ? ["0%", "200%"] : "0%",
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      />

      {IconComponent && (
        <motion.div
          style={{ transform: "translateZ(50px)" }}
          animate={{
            rotateY: isHovered ? [0, 360] : 0,
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{
            rotateY: { duration: 0.6, ease: "easeInOut" },
            scale: { duration: 0.3 }
          }}
          className="relative z-10"
        >
          <IconComponent className="text-5xl mb-3 text-primary-600 dark:text-primary-400" />
        </motion.div>
      )}
      <motion.h3
        className="text-lg font-semibold text-gray-900 dark:text-white text-center relative z-10"
        style={{ transform: "translateZ(25px)" }}
        animate={{
          color: isHovered ? "#f2545b" : undefined,
          y: isHovered ? -3 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {skill.name}
      </motion.h3>
    </motion.div>
  )
}

export default SkillCard
