'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

interface SwipeCardProps {
  onSwipe: (dir: 'left' | 'right') => void
  animating: 'left' | 'right' | null
  children: React.ReactNode
}

export default function SwipeCard({ onSwipe, animating, children }: SwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const isDragging = useRef(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const offsetRef = useRef({ x: 0, y: 0 })

  const getTransform = () => {
    if (animating === 'right') return 'translateX(150%) rotate(25deg)'
    if (animating === 'left') return 'translateX(-150%) rotate(-25deg)'
    if (offset.x !== 0 || offset.y !== 0) {
      return `translate(${offset.x}px, ${offset.y}px) rotate(${offset.x * 0.07}deg)`
    }
    return 'none'
  }

  const likeOpacity = Math.min(1, Math.max(0, offset.x / 60))
  const nopeOpacity = Math.min(1, Math.max(0, -offset.x / 60))

  const endDrag = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    const x = offsetRef.current.x
    if (x > 80) onSwipe('right')
    else if (x < -80) onSwipe('left')
    else setOffset({ x: 0, y: 0 })
    dragStart.current = null
    offsetRef.current = { x: 0, y: 0 }
  }, [onSwipe])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const t = e.touches[0]
      dragStart.current = { x: t.clientX, y: t.clientY }
      isDragging.current = true
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (!isDragging.current || !dragStart.current) return
      const t = e.touches[0]
      const newOffset = {
        x: t.clientX - dragStart.current.x,
        y: t.clientY - dragStart.current.y,
      }
      offsetRef.current = newOffset
      setOffset({ ...newOffset })
    }

    const onTouchEnd = () => endDrag()

    card.addEventListener('touchstart', onTouchStart, { passive: false })
    card.addEventListener('touchmove', onTouchMove, { passive: false })
    card.addEventListener('touchend', onTouchEnd)
    card.addEventListener('touchcancel', onTouchEnd)

    return () => {
      card.removeEventListener('touchstart', onTouchStart)
      card.removeEventListener('touchmove', onTouchMove)
      card.removeEventListener('touchend', onTouchEnd)
      card.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [endDrag])

  return (
    <div
      ref={cardRef}
      onMouseDown={(e) => {
        e.preventDefault()
        dragStart.current = { x: e.clientX, y: e.clientY }
        isDragging.current = true
      }}
      onMouseMove={(e) => {
        if (!isDragging.current || !dragStart.current) return
        const newOffset = {
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y,
        }
        offsetRef.current = newOffset
        setOffset({ ...newOffset })
      }}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        transform: getTransform(),
        transition: animating ? 'transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94)' : 'none',
        cursor: isDragging.current ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* LIKE */}
      {(offset.x > 10 || animating === 'right') && (
        <div style={{
          position: 'absolute', top: '20px', left: '16px', zIndex: 10,
          border: '3px solid #4CD964', borderRadius: '8px', padding: '4px 14px',
          transform: 'rotate(-15deg)', color: '#4CD964',
          fontSize: '26px', fontWeight: '900', letterSpacing: '2px',
          opacity: animating === 'right' ? 1 : likeOpacity,
          pointerEvents: 'none',
        }}>LIKE</div>
      )}
      {/* NOPE */}
      {(offset.x < -10 || animating === 'left') && (
        <div style={{
          position: 'absolute', top: '20px', right: '16px', zIndex: 10,
          border: '3px solid #FF3B30', borderRadius: '8px', padding: '4px 14px',
          transform: 'rotate(15deg)', color: '#FF3B30',
          fontSize: '26px', fontWeight: '900', letterSpacing: '2px',
          opacity: animating === 'left' ? 1 : nopeOpacity,
          pointerEvents: 'none',
        }}>NOPE</div>
      )}
      {children}
    </div>
  )
}
