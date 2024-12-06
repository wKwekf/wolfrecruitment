'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: "Manuela Stöckl",
    title: "Teamlead Talent Acquisition",
    company: "Siemens",
    quote: "Wolf lieferte hervorragende Ergebnisse bei der Einstellung von sehr gefragten Tech-Profilen. Wolf zeigt eine sehr professionelle Arbeitseinstellung und Beharrlichkeit bei der Suche nach den richtigen Talenten. Ich empfehle Wolf gerne für jedes Recruiting-Projekt weiter.",
    photo: "/photos/Manu.jpg",
    logo: "/logos/Logo_Siemens_Black.png"
  },
  {
    name: "Theresa Baeumel",
    title: "Director Talent Acquisition",
    company: "Nike",
    quote: "Die Zusammenarbeit mit Wolf war ein echtes Vergnügen. Wolf zeigte sehr hohe Arbeitsethik und Flexibilität und war eine große Hilfe! Ich hoffe, wir bekommen die Chance, in Zukunft wieder zusammenzuarbeiten!",
    photo: "/photos/Theresa.png",
    logo: "/logos/Logo_Nike_Black.png"
  },
  {
    name: "Marina Sverdel",
    title: "Domain Owner",
    company: "Metro.digital",
    quote: "Während des Recruiting-Prozesses für mehrere Positionen in meiner Abteilung beeindruckte mich Wolf mit exzellenter Talent Acquisition und Sourcing-Expertise, die weit über das Übliche hinausgeht. Wolf wäre immer mein bevorzugter Partner.",
    photo: "/photos/Marina.jpg",
    logo: "/logos/Logo_MetroDigital_Black.png"
  },
  {
    name: "Dirk Blöbl",
    title: "Technical Director & Partner",
    company: "DEPT",
    quote: "Wolf hat uns dabei geholfen, den richtigen Kandidaten für eine unserer technischen Führungspositionen zu finden. Wir konnten kurzfristig eine großartige Person einstellen und sind mehr als glücklich, einen neuen Kollegen an Bord zu haben. Ich freue mich auf die weitere Zusammenarbeit mit Wolf.",
    photo: "/photos/Dirk.jpg",
    logo: "/logos/Logo_Dept_Black.png"
  },
  {
    name: "Pablo Portilla",
    title: "Teamlead Talent Acquisition",
    company: "Santander",
    quote: "Im Laufe der Zeit trifft man viele gute Recruiter, aber nur wenige sind außergewöhnlich. Wolf gehört zu den Außergewöhnlichen. Wolf besitzt ein außerordentliches Talent dafür, die Wünsche und vor allem die Bedürfnisse der Menschen zu verstehen.",
    photo: "/photos/Pablo.png",
    logo: "/logos/Logo_Santander_Black.png"
  }
]

const TESTIMONIAL_HEIGHT = 500;

export default function TestimonialsSection() {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0])
  const [containerHeight, setContainerHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight)
    }
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    
    if (section === 'testimonials' && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('Scrolling to Testimonials section');
    }
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex(([current, _]) => [(current + 1) % testimonials.length, 1])
  }

  const prevTestimonial = () => {
    setCurrentIndex(([current, _]) => [(current - 1 + testimonials.length) % testimonials.length, -1])
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      }
    }
  }

  return (
    <section ref={sectionRef} id="testimonials" className="bg-white py-20 px-6 md:px-0">
      <div className="max-w-6xl mx-auto">
        <p className="text-lg mb-2">Recruiting das dich nach vorne bringt</p>
        <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium mb-8 sm:mb-12 text-[#121118]">
          Weitere Kundenstimmen
        </h1>
        
        <div 
          className="relative mb-16 md:mb-0"
          style={{ 
            height: `${TESTIMONIAL_HEIGHT}px`,
            minHeight: `${TESTIMONIAL_HEIGHT}px`
          }}
        >
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-r text-white transition-colors"
            aria-label="Vorheriges Testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-l text-white transition-colors"
            aria-label="Nächstes Testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <motion.div
            ref={containerRef}
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            layoutId="testimonial-container"
            className="flex flex-col md:flex-row items-center justify-between rounded-lg absolute w-full"
          >
            <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative">
              <Image
                src={testimonials[currentIndex].photo}
                alt={testimonials[currentIndex].name}
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                onError={(e) => {
                  e.currentTarget.src = "/photos/platzhalter.jpg"
                }}
              />
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-12 bg-white rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
              <blockquote className="text-base md:text-lg font-medium mb-6">
                {testimonials[currentIndex].quote}
              </blockquote>
              <div className="mb-6">
                <p className="font-semibold">{testimonials[currentIndex].name}</p>
                <p className="text-gray-600">{testimonials[currentIndex].title} at {testimonials[currentIndex].company}</p>
              </div>
              <div className="relative w-[120px] h-[40px]">
                <Image
                  src={testimonials[currentIndex].logo}
                  alt={`${testimonials[currentIndex].company} logo`}
                  layout="fill"
                  objectFit="contain"
                  onError={(e) => {
                    e.currentTarget.src = "/photos/platzhalter.jpg"
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 ${
                index === currentIndex ? 'bg-[#F25A75]' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex([index, index > currentIndex ? 1 : -1])}
              animate={{
                borderRadius: index === currentIndex ? '0%' : '50%',
                scale: index === currentIndex ? 1.2 : 1
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              aria-label={`Gehe zu Testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

