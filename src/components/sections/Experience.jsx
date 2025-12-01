import { motion } from 'framer-motion'
import Section from '../ui/Section'
import ExperienceItem from './ExperienceItem'
import experienceData from '../../assets/data/experience.json'

const Experience = () => {
  return (
    <Section id="experience" className="bg-beige dark:bg-dark-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and achievements
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-12">
          {experienceData.map((experience, index) => (
            <ExperienceItem
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Experience
