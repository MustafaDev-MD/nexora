'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

/**
 * Boots the original Nexora animation engine after the React tree is mounted.
 * Requires matching DOM ids from the design system (orb, mq, workCar, tl, etc.).
 */
export function EffectsEngine() {
  const booted = useRef(false)

  useEffect(() => {
    const yr = document.getElementById('yr')
    if (yr) yr.textContent = String(new Date().getFullYear())
  }, [])

  function loadEngine() {
    if (booted.current || document.getElementById('nexora-app-engine')) return
    booted.current = true
    const s = document.createElement('script')
    s.id = 'nexora-app-engine'
    s.src = '/nexora-app.js'
    s.async = false
    document.body.appendChild(s)
  }

  return (
    <Script
      src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
      strategy="afterInteractive"
      onLoad={loadEngine}
      onError={loadEngine}
    />
  )
}
