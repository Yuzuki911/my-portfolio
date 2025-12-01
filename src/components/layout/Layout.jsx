import { ThemeProvider } from '../../context/ThemeContext'
import Header from './Header'
import Footer from './Footer'
import CustomCursor from '../ui/CustomCursor'
import ParticleBackground from '../ui/ParticleBackground'

const Layout = ({ children }) => {
  // Cursor Style Options: 'dot-ring' | 'spotlight' | 'arrow' | 'particle'
  // Change the style prop below to switch cursor designs:
  // - 'dot-ring': Minimalist dot with expanding ring
  // - 'spotlight': Large glowing spotlight (current)
  // - 'arrow': Custom arrow with smooth trail
  // - 'particle': Dynamic particles with explosion effects

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-cornsilk dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300 cursor-none">
        <ParticleBackground />
        <CustomCursor style="arrow" />
        <Header />
        <main className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Layout
