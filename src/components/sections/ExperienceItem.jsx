import { motion } from 'framer-motion'
import { FiBriefcase, FiMapPin, FiCheckCircle } from 'react-icons/fi'

const ExperienceItem = ({ experience, index }) => {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <div className="flex items-center gap-6">
        <div className="hidden md:block flex-1 text-right">
          {isEven && <ExperienceContent experience={experience} />}
        </div>

        <div className="relative flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-12 h-12 bg-primary-600 dark:bg-primary-700 rounded-full flex items-center justify-center shadow-lg z-10"
          >
            <FiBriefcase className="text-white text-xl" />
          </motion.div>
          {index !== 2 && (
            <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700 absolute top-12" />
          )}
        </div>

        <div className="flex-1">
          <div className="md:hidden">
            <ExperienceContent experience={experience} />
          </div>
          {!isEven && (
            <div className="hidden md:block">
              <ExperienceContent experience={experience} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const ExperienceContent = ({ experience }) => (
  <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
    <div className="mb-3">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
        {experience.role}
      </h3>
      <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
        {experience.company}
      </p>
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
        <span>{experience.period}</span>
        <span className="flex items-center gap-1">
          <FiMapPin size={14} />
          {experience.location}
        </span>
      </div>
    </div>

    <p className="text-gray-700 dark:text-gray-300 mb-4">
      {experience.description}
    </p>

    <div className="space-y-2 mb-4">
      {experience.achievements.map((achievement, idx) => (
        <div key={idx} className="flex items-start gap-2">
          <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {achievement}
          </p>
        </div>
      ))}
    </div>

    <div className="flex flex-wrap gap-2">
      {experience.technologies.map((tech, idx) => (
        <span
          key={idx}
          className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
)

export default ExperienceItem
