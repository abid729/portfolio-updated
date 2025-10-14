'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Resume from '@/components/Resume'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import useVisitorTracking from '@/hooks/useVisitorTracking'

export default function Home() {
  // Track visitor on page load
  useVisitorTracking()

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </main>
  )
}

