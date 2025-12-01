import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { useState } from 'react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const [ripples, setRipples] = useState([])

  const baseStyles = 'font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 relative overflow-hidden cursor-pointer'

  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl dark:bg-primary-600 dark:hover:bg-primary-700',
    secondary: 'bg-accent-600 hover:bg-accent-700 text-white shadow-lg hover:shadow-xl dark:bg-accent-600 dark:hover:bg-accent-700',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-600 dark:hover:text-white',
    ghost: 'text-gray-700 hover:bg-beige/50 dark:text-gray-300 dark:hover:bg-dark-card'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const disabledStyles = 'opacity-50 cursor-not-allowed'

  const handleClick = (e) => {
    if (!disabled) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const ripple = { x, y, id: Date.now() }
      setRipples([...ripples, ripple])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
      }, 600)
      onClick && onClick(e)
    }
  }

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && disabledStyles,
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
          transition: { duration: 0.6, ease: 'easeInOut' }
        }}
      />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          animate={{
            width: 100,
            height: 100,
            opacity: [1, 0],
            x: -50,
            y: -50,
          }}
          transition={{ duration: 0.6 }}
        />
      ))}

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export default Button
