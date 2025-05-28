'use client'
import { useState, useRef } from 'react'
import styles from './NoteCard.module.css'

export default function NoteCard({ title, text, onClick }) {
  const cardRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, parallaxX: 0, parallaxY: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    setMousePosition({ 
      x: localX, 
      y: localY, 
      parallaxX: x, 
      parallaxY: y 
    })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0, parallaxX: 0, parallaxY: 0 })
  }

  const innerContentStyle = {
    transform: `
      perspective(1000px) 
      rotateX(${mousePosition.parallaxY / 20}deg) 
      rotateY(${-mousePosition.parallaxX / 20}deg)
    `,
    transition: 'transform 0.5s ease-out' 
  }

  return (
    <div 
      ref={cardRef} 
      className={styles.card} 
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--mouse-x': `${mousePosition.x}px`, 
        '--mouse-y': `${mousePosition.y}px`,
        '--parallax-x': `${-mousePosition.parallaxX / 40}deg`, 
        '--parallax-y': `${mousePosition.parallaxY / 40}deg`
      }}
    >
      <div className={styles.cardInnerContent} style={innerContentStyle}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardText}>{text}</p>
      </div>
    </div>
  )
}