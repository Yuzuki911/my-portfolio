import { motion } from 'framer-motion'

const SectionHeader = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
      {title}
    </h2>
    <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full mb-6" />
    {subtitle && (
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </motion.div>
)

export default SectionHeader
