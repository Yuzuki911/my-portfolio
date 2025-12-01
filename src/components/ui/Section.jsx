import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { clsx } from 'clsx'

const Section = ({ children, id, className, ...props }) => {
  const [ref, controls] = useScrollAnimation()

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      id={id}
      className={clsx('py-16 md:py-24', className)}
      {...props}
    >
      {children}
    </motion.section>
  )
}

export default Section
