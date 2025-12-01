import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { useState } from 'react'

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(true)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

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
      whileHover={{ z: 50 }}
      className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary-400 to-accent-500 overflow-hidden group">
        {project.image && imageLoaded && (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImageLoaded(false)}
          />
        )}

        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex gap-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: isHovered ? 1 : 0,
              rotate: isHovered ? 0 : -180
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {project.demoLink && (
              <motion.a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white dark:bg-dark-card rounded-full text-gray-900 dark:text-white hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
                aria-label="View demo"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
              >
                <FiExternalLink size={20} />
              </motion.a>
            )}
            {project.codeLink && (
              <motion.a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white dark:bg-dark-card rounded-full text-gray-900 dark:text-white hover:bg-accent-600 hover:text-white transition-colors cursor-pointer"
                aria-label="View code"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
              >
                <FiGithub size={20} />
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>

      <div className="p-6" style={{ transform: "translateZ(25px)" }}>
        <div className="flex items-start justify-between mb-3">
          <motion.h3
            className="text-xl font-bold text-gray-900 dark:text-white"
            animate={{ color: isHovered ? "#f2545b" : undefined }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          <motion.span
            className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full cursor-pointer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {project.category}
          </motion.span>
        </div>

        <motion.p
          className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3"
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.description}
        </motion.p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
              whileHover={{
                scale: 1.15,
                backgroundColor: "#f2545b",
                color: "#fff",
                transition: { duration: 0.2 }
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
