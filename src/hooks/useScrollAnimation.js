import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'

export const useScrollAnimation = (threshold = 0.2, triggerOnce = true) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold,
    triggerOnce
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  return [ref, controls]
}
