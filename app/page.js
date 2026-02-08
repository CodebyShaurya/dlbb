'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Zap, Shield, Swords, Eye, Users, ChevronDown, Menu, X, Star, Trophy, Target, Flame, Mail, MapPin, Gamepad2, Award, Instagram, Twitter, Youtube, Github } from 'lucide-react'

// ==================== BEYBLADE SVG COMPONENT ====================
const BeybladeSVG = ({ color = '#c41e3a', size = 120, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className}>
    <defs>
      <radialGradient id={`grad-${color.replace('#','')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="1" />
        <stop offset="70%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a1a1a" stopOpacity="1" />
      </radialGradient>
      <filter id={`glow-${color.replace('#','')}`}>
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <circle cx="60" cy="60" r="55" fill="#1a1a1a" stroke={color} strokeWidth="2" filter={`url(#glow-${color.replace('#','')})`} />
    <circle cx="60" cy="60" r="48" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
    <path d="M60 12 L72 45 L60 38 L48 45 Z" fill={color} opacity="0.9" />
    <path d="M108 60 L75 72 L82 60 L75 48 Z" fill={color} opacity="0.9" />
    <path d="M60 108 L48 75 L60 82 L72 75 Z" fill={color} opacity="0.9" />
    <path d="M12 60 L45 48 L38 60 L45 72 Z" fill={color} opacity="0.9" />
    <circle cx="60" cy="60" r="18" fill={`url(#grad-${color.replace('#','')})`} stroke={color} strokeWidth="2" />
    <circle cx="60" cy="60" r="8" fill="#0a0a0a" stroke={color} strokeWidth="1.5" />
    <circle cx="60" cy="60" r="3" fill={color} />
    {/* Attack ring details */}
    <path d="M60 15 Q75 30 60 45 Q45 30 60 15" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
    <path d="M105 60 Q90 75 75 60 Q90 45 105 60" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
    <path d="M60 105 Q45 90 60 75 Q75 90 60 105" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
    <path d="M15 60 Q30 45 45 60 Q30 75 15 60" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
  </svg>
)

// ==================== SPARK EFFECT ====================
const SparkEffect = ({ isVisible }) => {
  if (!isVisible) return null
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ backgroundColor: i % 2 === 0 ? '#c41e3a' : '#3b82f6' }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.5, 0],
            x: [0, Math.cos(i * 30 * Math.PI / 180) * 80],
            y: [0, Math.sin(i * 30 * Math.PI / 180) * 80],
            opacity: [1, 0.8, 0]
          }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
        />
      ))}
      <motion.div
        className="absolute w-24 h-24 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(196,30,58,0.6) 0%, transparent 70%)' }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 3, 4], opacity: [1, 0.5, 0] }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  )
}

// ==================== COLLISION SECTION DIVIDER ====================
const CollisionDivider = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hasCollided, setHasCollided] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setHasCollided(true), 800)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <div ref={ref} className="relative h-40 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
      </div>
      
      <motion.div
        className="absolute left-0"
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: hasCollided ? 'calc(50vw - 60px)' : 'calc(50vw - 120px)', opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className={hasCollided ? 'animate-spin-fast' : 'animate-spin-slow'}>
          <BeybladeSVG color="#c41e3a" size={80} />
        </div>
      </motion.div>

      <motion.div
        className="absolute right-0"
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: hasCollided ? 'calc(-50vw + 60px)' : 'calc(-50vw + 120px)', opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className={hasCollided ? 'animate-spin-fast' : 'animate-spin-slow'}>
          <BeybladeSVG color="#3b82f6" size={80} />
        </div>
      </motion.div>

      <SparkEffect isVisible={hasCollided} />
    </div>
  )
}

// ==================== NAVBAR ====================
const Navbar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'arena', label: 'Battle Arena' },
    { id: 'register', label: 'Register' },
    { id: 'teams', label: 'Teams' },
  ]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-red-900/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
            <div className="animate-spin-slow">
              <BeybladeSVG color="#c41e3a" size={32} />
            </div>
            <span className="font-bold text-lg tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="text-red-500">DBC</span>
              <span className="text-white/60 text-xs ml-1 hidden sm:inline">2025</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-red-400'
                    : 'text-white/60 hover:text-white'
                }`}
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/80 hover:text-red-400 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-red-900/30"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full text-left px-4 py-3 text-sm font-semibold tracking-wider uppercase transition-all ${
                    activeSection === item.id
                      ? 'text-red-400 bg-red-900/20 border-l-2 border-red-500'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ==================== HERO SECTION ====================
const HeroSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-[#0a0a0a] to-[#0a0a0a]" />
      <div className="absolute inset-0 grid-bg" />
      
      {/* Diagonal lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-red-500 to-transparent transform rotate-12 origin-top-right" />
          <div className="absolute top-0 right-20 w-px h-full bg-gradient-to-b from-red-500/50 to-transparent transform rotate-12 origin-top-right" />
        </div>
      </div>

      {/* Floating Beyblades */}
      <motion.div
        className="absolute top-20 left-10 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <BeybladeSVG color="#c41e3a" size={200} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 opacity-10"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <BeybladeSVG color="#3b82f6" size={150} />
      </motion.div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.3em] uppercase border border-red-500/40 text-red-400 bg-red-500/10 rounded-sm"
            style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Season 2025 / Delhi Edition
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6 text-glow-red"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          <span className="block text-white">DELHI</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600">
            BEYBLADE
          </span>
          <span className="block text-white/90">CHAMPIONSHIP</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-white/50 font-light tracking-[0.2em] uppercase mb-10"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          Where Strategy Meets Spin
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 bg-gradient-to-r from-red-700 to-red-600 text-white font-bold tracking-wider uppercase text-sm rounded-sm hover:from-red-600 hover:to-red-500 transition-all duration-300 shadow-lg shadow-red-900/30 hover:shadow-red-900/50"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Enter the Arena
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 border border-white/20 text-white/80 font-bold tracking-wider uppercase text-sm rounded-sm hover:border-red-500/50 hover:text-white hover:bg-red-500/5 transition-all duration-300"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Learn More
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-red-500/50" size={24} />
      </motion.div>
    </section>
  )
}

// ==================== ABOUT SECTION ====================
const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    { icon: Swords, title: 'Strategic Combat', desc: 'Master the art of launch techniques and blade customization for tactical superiority.' },
    { icon: Zap, title: 'High-Intensity Battles', desc: 'Experience heart-pounding matches where milliseconds determine the champion.' },
    { icon: Shield, title: 'Engineering Excellence', desc: 'Combine physics, weight distribution, and spin dynamics for the ultimate build.' },
    { icon: Trophy, title: 'Championship Glory', desc: 'Compete for the prestigious Delhi Championship title and eternal bragging rights.' },
  ]

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-red-950/5 to-[#0a0a0a]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-400 mb-4 block" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            // About the Championship
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="text-white">THE ULTIMATE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">BATTLE TOURNAMENT</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/50 text-lg leading-relaxed">
            The Delhi Beyblade Championship brings together the finest bladers from across the nation. 
            This isn&apos;t just spinning tops — it&apos;s a fusion of engineering, strategy, and pure competitive fire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card-terminal p-6 rounded-sm group cursor-default"
            >
              <div className="w-12 h-12 rounded-sm bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                <feature.icon className="text-red-400" size={22} />
              </div>
              <h3 className="text-lg font-bold tracking-wide mb-2 text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px' }}>
                {feature.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '128+', label: 'Registered Bladers' },
            { value: '32', label: 'Battle Rounds' },
            { value: '1', label: 'Champion' },
            { value: '10K', label: 'Prize Pool (INR)' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4">
              <div className="text-3xl md:text-4xl font-black text-red-400 mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-xs tracking-[0.2em] uppercase text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ==================== BATTLE ARENA SECTION ====================
const ArenaSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const rules = [
    { step: '01', title: 'Customize Your Blade', desc: 'Select your attack ring, weight disk, and blade base for optimal performance.' },
    { step: '02', title: 'Enter the Stadium', desc: 'Face your opponent in the official Beystadium. One launch decides your fate.' },
    { step: '03', title: 'Battle Protocol', desc: 'Outspin, burst, or knock out your opponent. Best of 3 rounds wins the match.' },
    { step: '04', title: 'Climb the Bracket', desc: 'Win battles to advance through the elimination bracket to the grand finals.' },
  ]

  return (
    <section id="arena" ref={ref} className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0808] to-[#0a0a0a]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-400 mb-4 block" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            // Battle Protocol
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="text-white">THE</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">ARENA</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/50 text-lg">
            Every battle follows a strict protocol. Learn the rules, master the game.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card-terminal p-6 rounded-sm relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-5xl font-black text-red-500/10" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {rule.step}
              </div>
              <div className="relative">
                <div className="text-xs font-bold tracking-[0.3em] text-red-400 mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  STEP {rule.step}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '16px' }}>
                  {rule.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{rule.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arena Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="relative w-64 h-64">
            {/* Beystadium ring */}
            <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-pulse" />
            <div className="absolute inset-4 rounded-full border border-red-500/10" />
            <div className="absolute inset-8 rounded-full border border-white/5" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-red-500/5 to-transparent" />
            
            {/* Spinning Beyblades in stadium */}
            <motion.div
              className="absolute"
              style={{ top: '30%', left: '25%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <BeybladeSVG color="#c41e3a" size={50} />
            </motion.div>
            <motion.div
              className="absolute"
              style={{ top: '45%', right: '25%' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            >
              <BeybladeSVG color="#3b82f6" size={50} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== REGISTRATION SECTION ====================
const RegistrationSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [viewerForm, setViewerForm] = useState({ name: '', email: '', city: '' })
  const [fighterForm, setFighterForm] = useState({ name: '', email: '', beybladeType: '', experienceLevel: '' })
  const [viewerSubmitting, setViewerSubmitting] = useState(false)
  const [fighterSubmitting, setFighterSubmitting] = useState(false)
  const [viewerSuccess, setViewerSuccess] = useState(false)
  const [fighterSuccess, setFighterSuccess] = useState(false)
  const [viewerError, setViewerError] = useState('')
  const [fighterError, setFighterError] = useState('')

  const handleViewerSubmit = async (e) => {
    e.preventDefault()
    setViewerSubmitting(true)
    setViewerError('')
    try {
      const res = await fetch('/api/register/viewer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(viewerForm),
      })
      const data = await res.json()
      if (res.ok) {
        setViewerSuccess(true)
        setViewerForm({ name: '', email: '', city: '' })
      } else {
        setViewerError(data.error || 'Registration failed')
      }
    } catch (err) {
      setViewerError('Something went wrong. Try again.')
    } finally {
      setViewerSubmitting(false)
    }
  }

  const handleFighterSubmit = async (e) => {
    e.preventDefault()
    setFighterSubmitting(true)
    setFighterError('')
    try {
      const res = await fetch('/api/register/fighter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fighterForm),
      })
      const data = await res.json()
      if (res.ok) {
        setFighterSuccess(true)
        setFighterForm({ name: '', email: '', beybladeType: '', experienceLevel: '' })
      } else {
        setFighterError(data.error || 'Registration failed')
      }
    } catch (err) {
      setFighterError('Something went wrong. Try again.')
    } finally {
      setFighterSubmitting(false)
    }
  }

  return (
    <section id="register" ref={ref} className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-red-950/5 to-[#0a0a0a]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-400 mb-4 block" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            // Registration Open
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="text-white">JOIN THE</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">BATTLE</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/50 text-lg">
            Choose your path. Watch from the stands or fight in the arena.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Viewer Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-terminal rounded-sm overflow-hidden"
          >
            <div className="bg-gradient-to-r from-red-900/30 to-transparent px-6 py-3 border-b border-red-500/20">
              <div className="flex items-center gap-2">
                <Eye className="text-red-400" size={16} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Spectator Terminal
                </span>
              </div>
            </div>
            <div className="p-6">
              {viewerSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <Star className="text-green-400" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-green-400 mb-2" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px' }}>REGISTERED</h3>
                  <p className="text-white/50 text-sm">Welcome to the arena, spectator.</p>
                  <button onClick={() => setViewerSuccess(false)} className="mt-4 text-xs text-red-400 hover:text-red-300 underline">Register another</button>
                </div>
              ) : (
                <form onSubmit={handleViewerSubmit} className="space-y-4">
                  <div>
                    <Label className="text-xs tracking-wider uppercase text-white/50 mb-2 block">Name</Label>
                    <Input
                      required
                      value={viewerForm.name}
                      onChange={(e) => setViewerForm({...viewerForm, name: e.target.value})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-red-500/50 rounded-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <Label className="text-xs tracking-wider uppercase text-white/50 mb-2 block">Email</Label>
                    <Input
                      required
                      type="email"
                      value={viewerForm.email}
                      onChange={(e) => setViewerForm({...viewerForm, email: e.target.value})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-red-500/50 rounded-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label className="text-xs tracking-wider uppercase text-white/50 mb-2 block">City</Label>
                    <Input
                      required
                      value={viewerForm.city}
                      onChange={(e) => setViewerForm({...viewerForm, city: e.target.value})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-red-500/50 rounded-sm"
                      placeholder="Your city"
                    />
                  </div>
                  {viewerError && <p className="text-red-400 text-xs">{viewerError}</p>}
                  <button
                    type="submit"
                    disabled={viewerSubmitting}
                    className="w-full py-3 bg-white/5 border border-red-500/30 text-red-400 font-bold tracking-wider uppercase text-xs rounded-sm hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300 disabled:opacity-50"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {viewerSubmitting ? 'Processing...' : 'Watch the Battle'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Fighter Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-terminal rounded-sm overflow-hidden border-glow"
          >
            <div className="bg-gradient-to-r from-red-700/30 to-transparent px-6 py-3 border-b border-red-500/30">
              <div className="flex items-center gap-2">
                <Swords className="text-red-400" size={16} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Fighter Terminal
                </span>
                <span className="ml-auto text-[10px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded-sm font-bold tracking-wider">HOT</span>
              </div>
            </div>
            <div className="p-6">
              {fighterSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                    <Flame className="text-red-400" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-red-400 mb-2" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px' }}>BATTLE READY</h3>
                  <p className="text-white/50 text-sm">You&apos;re in the tournament, warrior.</p>
                  <button onClick={() => setFighterSuccess(false)} className="mt-4 text-xs text-red-400 hover:text-red-300 underline">Register another</button>
                </div>
              ) : (
                <form onSubmit={handleFighterSubmit} className="space-y-4">
                  <div>
                    <Label className="text-xs tracking-wider uppercase text-white/50 mb-2 block">Name</Label>
                    <Input
                      required
                      value={fighterForm.name}
                      onChange={(e) => setFighterForm({...fighterForm, name: e.target.value})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-red-500/50 rounded-sm"
                      placeholder="Your battle name"
                    />
                  </div>
                  <div>
                    <Label className="text-xs tracking-wider uppercase text-white/50 mb-2 block">Email</Label>
                    <Input
                      required
                      type="email"
                      value={fighterForm.email}
                      onChange={(e) => setFighterForm({...fighterForm, email: e.target.value})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-red-500/50 rounded-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label className="text-xs tracking-wider uppercase text-white/50 mb-2 block">Beyblade Type</Label>
                    <select
                      required
                      value={fighterForm.beybladeType}
                      onChange={(e) => setFighterForm({...fighterForm, beybladeType: e.target.value})}
                      className="w-full h-10 px-3 bg-white/5 border border-white/10 text-white rounded-sm focus:border-red-500/50 focus:outline-none text-sm"
                    >
                      <option value="" className="bg-[#1a1a1a]">Select type</option>
                      <option value="Attack" className="bg-[#1a1a1a]">Attack</option>
                      <option value="Defense" className="bg-[#1a1a1a]">Defense</option>
                      <option value="Stamina" className="bg-[#1a1a1a]">Stamina</option>
                      <option value="Balance" className="bg-[#1a1a1a]">Balance</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs tracking-wider uppercase text-white/50 mb-2 block">Experience Level</Label>
                    <select
                      required
                      value={fighterForm.experienceLevel}
                      onChange={(e) => setFighterForm({...fighterForm, experienceLevel: e.target.value})}
                      className="w-full h-10 px-3 bg-white/5 border border-white/10 text-white rounded-sm focus:border-red-500/50 focus:outline-none text-sm"
                    >
                      <option value="" className="bg-[#1a1a1a]">Select level</option>
                      <option value="Beginner" className="bg-[#1a1a1a]">Beginner (0-1 years)</option>
                      <option value="Intermediate" className="bg-[#1a1a1a]">Intermediate (1-3 years)</option>
                      <option value="Advanced" className="bg-[#1a1a1a]">Advanced (3-5 years)</option>
                      <option value="Pro" className="bg-[#1a1a1a]">Pro (5+ years)</option>
                    </select>
                  </div>
                  {fighterError && <p className="text-red-400 text-xs">{fighterError}</p>}
                  <button
                    type="submit"
                    disabled={fighterSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-red-700 to-red-600 text-white font-bold tracking-wider uppercase text-xs rounded-sm hover:from-red-600 hover:to-red-500 transition-all duration-300 shadow-lg shadow-red-900/30 disabled:opacity-50"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {fighterSubmitting ? 'Processing...' : 'Enter the Arena'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ==================== TEAMS SECTION ====================
const TeamsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const team = [
    { name: 'Arjun Verma', role: 'Tournament Director', icon: Trophy },
    { name: 'Priya Sharma', role: 'Head Judge', icon: Shield },
    { name: 'Ravi Kapoor', role: 'Arena Master', icon: Target },
    { name: 'Sneha Patel', role: 'Technical Coordinator', icon: Zap },
    { name: 'Vikram Singh', role: 'Registration Lead', icon: Users },
    { name: 'Ananya Das', role: 'Media & Broadcast', icon: Eye },
  ]

  return (
    <section id="teams" ref={ref} className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0808] to-[#0a0a0a]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-400 mb-4 block" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            // The Officials
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="text-white">BATTLE</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">COMMAND</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/50 text-lg">
            The team behind Delhi&apos;s most intense Beyblade tournament.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-terminal p-6 rounded-sm text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500/10 to-red-900/10 border border-red-500/20 flex items-center justify-center group-hover:border-red-500/40 transition-colors">
                <member.icon className="text-red-400/70 group-hover:text-red-400 transition-colors" size={24} />
              </div>
              <h3 className="text-sm font-bold tracking-wider text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {member.name}
              </h3>
              <p className="text-xs tracking-wider uppercase text-white/40">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== FOOTER ====================
const Footer = () => (
  <footer id="footer" className="relative py-16 border-t border-red-900/20">
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0d0505]" />
    
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="animate-spin-slow">
              <BeybladeSVG color="#c41e3a" size={28} />
            </div>
            <span className="font-bold text-sm tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="text-red-500">DBC</span>
              <span className="text-white/40 ml-1">2025</span>
            </span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed mb-4">
            The premier Beyblade championship experience. Where engineering meets competition.
          </p>
          <p className="text-lg font-bold text-white/20 italic" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11px' }}>
            "Spin Smart. Battle Hard."
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-red-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Quick Links
          </h4>
          <ul className="space-y-2">
            {['Home', 'About', 'Battle Arena', 'Register', 'Teams'].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(' ', '-').replace('battle-arena', 'arena')}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const id = link.toLowerCase().replace(' ', '-').replace('battle-arena', 'arena')
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-white/40 hover:text-red-400 text-sm transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-red-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Connect
          </h4>
          <div className="flex gap-3">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:border-red-500/30 hover:bg-red-500/5 transition-all"
              >
                <Icon className="text-white/40 hover:text-red-400" size={16} />
              </a>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-white/40 text-sm flex items-center gap-2">
              <MapPin size={14} /> New Delhi, India
            </p>
            <p className="text-white/40 text-sm flex items-center gap-2 mt-1">
              <Mail size={14} /> contact@delhibeyblade.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-xs tracking-wider">
          &copy; 2025 Delhi Beyblade Championship. All rights reserved.
        </p>
        <p className="text-white/20 text-xs tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          LET IT RIP
        </p>
      </div>
    </div>
  </footer>
)

// ==================== MAIN APP ====================
export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = ['home', 'about', 'arena', 'register', 'teams']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="relative min-h-screen bg-[#0a0a0a]">
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <CollisionDivider />
      <AboutSection />
      <CollisionDivider />
      <ArenaSection />
      <CollisionDivider />
      <RegistrationSection />
      <CollisionDivider />
      <TeamsSection />
      <Footer />
    </main>
  )
}
