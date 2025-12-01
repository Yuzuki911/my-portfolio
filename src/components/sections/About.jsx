import { motion } from 'framer-motion'
import { FiDownload, FiMapPin } from 'react-icons/fi'
import { SITE_CONFIG } from '../../utils/constants'
import Section from '../ui/Section'
import Button from '../ui/Button'

const About = () => {
  return (
    <Section id="about" className="bg-cornsilk dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
                  <span className="text-8xl text-white font-bold">
                    {SITE_CONFIG.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-600 dark:bg-primary-700 rounded-2xl -z-10"
                animate={{
                  rotate: [0, 5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FiMapPin className="text-primary-600" />
              <span>{SITE_CONFIG.location}</span>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {SITE_CONFIG.tagline}
            </h3>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {SITE_CONFIG.bio}
            </p>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="font-semibold text-gray-900 dark:text-white">What I Do:</h4>
              <motion.ul
                className="space-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.7
                    }
                  }
                }}
              >
                {[
                  { text: "Build scalable web applications with modern frameworks", color: "bg-primary-600" },
                  { text: "Develop AI-powered solutions and machine learning models", color: "bg-accent-600" },
                  { text: "Design and implement RESTful APIs and microservices", color: "bg-primary-600" },
                  { text: "Optimize performance and user experience", color: "bg-accent-600" }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 12
                        }
                      }
                    }}
                    whileHover={{
                      x: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.span
                      className={`w-2 h-2 ${item.color} rounded-full`}
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                    {item.text}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => window.open(SITE_CONFIG.resume, '_blank')}
                  variant="primary"
                  size="lg"
                >
                  <FiDownload />
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default About
