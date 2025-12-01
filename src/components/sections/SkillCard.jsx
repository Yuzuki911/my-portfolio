import { motion } from 'framer-motion'
import * as SiIcons from 'react-icons/si'
import * as FaIcons from 'react-icons/fa'

const SkillCard = ({ skill }) => {
  const IconComponent = SiIcons[skill.icon] || FaIcons[skill.icon]

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      {IconComponent && (
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <IconComponent className="text-5xl mb-3 text-blue-500 dark:text-blue-400" />
        </motion.div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
        {skill.name}
      </h3>
    </motion.div>
  )
}

export default SkillCard
