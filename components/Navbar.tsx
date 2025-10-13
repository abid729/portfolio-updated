'use client'

import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const [nav, setNav] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { id: 1, link: 'home', title: 'Home' },
    { id: 2, link: 'about', title: 'About' },
    { id: 3, link: 'skills', title: 'Skills' },
    { id: 4, link: 'projects', title: 'Projects' },
    { id: 5, link: 'resume', title: 'Resume' },
    { id: 6, link: 'contact', title: 'Contact' },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setNav(false)
  }

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold text-gradient cursor-pointer"
          >
            MA
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {links.map(({ id, link, title }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(link)}
                  className="text-gray-700 hover:text-primary cursor-pointer transition-colors duration-300 font-medium"
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div
            onClick={() => setNav(!nav)}
            className="cursor-pointer pr-4 z-10 text-gray-700 md:hidden"
          >
            {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {nav && (
        <ul className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg py-6 space-y-4">
          {links.map(({ id, link, title }) => (
            <li key={id} className="px-4">
              <button
                onClick={() => scrollToSection(link)}
                className="block w-full text-left text-gray-700 hover:text-primary cursor-pointer transition-colors duration-300 font-medium py-2"
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

