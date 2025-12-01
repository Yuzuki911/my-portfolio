import Layout from './components/layout/Layout'
import PageTransition from './components/ui/PageTransition'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Certifications from './components/sections/Certifications'
import GitHubStats from './components/sections/GitHubStats'
import Contact from './components/sections/Contact'

function App() {
  return (
    <PageTransition>
      <Layout>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <GitHubStats />
        <Contact />
      </Layout>
    </PageTransition>
  )
}

export default App
