import { motion } from 'framer-motion'
import Section from '../ui/Section'
import SkillCard from './SkillCard'
import skillsData from '../../assets/data/skills.json'
import SectionHeader from '../ui/SectionHeader'
import { staggerContainer, staggerItem } from '../../utils/animations'

const Skills = () => {
  return (
    <Section id="skills" className="bg-cornsilk dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Skills & Technologies"
          subtitle="Technologies and tools I use to bring ideas to life"
        />

        <div className="space-y-12 max-w-6xl mx-auto">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center md:text-left">
                {category}
              </h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              >
                {skills.map((skill, index) => (
                  <motion.div key={index} variants={staggerItem}>
                    <SkillCard skill={skill} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Skills
