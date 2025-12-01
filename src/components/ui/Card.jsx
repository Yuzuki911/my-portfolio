import { motion } from 'framer-motion'
import { clsx } from 'clsx'

const Card = ({ children, className, hover = true, ...props }) => {
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300'
  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1' : ''

  return (
    <motion.div
      className={clsx(baseStyles, hoverStyles, className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
