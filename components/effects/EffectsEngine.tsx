'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

/**
 * Boots Nexora animation engine after Three.js loads.
 * Local /three.min.js = same-origin + long cache on Vercel (no CDN lag).
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

    const start = () => {
      const s = document.createElement('script')
      s.id = 'nexora-app-engine'
      s.src = '/nexora-app.js'
      s.async = false
      document.body.appendChild(s)
    }

    // First paint first, then WebGL (helps Vercel / mid-range phones)
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
      .requestIdleCallback
    if (typeof ric === 'function') {
      ric(start, { timeout: 1200 })
    } else {
      setTimeout(start, 200)
    }
  }

  return (
    <Script
      src="/three.min.js"
      strategy="afterInteractive"
      onLoad={loadEngine}
      onError={loadEngine}
    />
  )
}