import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'

/**
 * Use with Framer Motion `variants` + `animate={controls}` for stagger animations.
 * Returns [ref, controls] — attach ref to the container, pass controls to `animate`.
 */
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
