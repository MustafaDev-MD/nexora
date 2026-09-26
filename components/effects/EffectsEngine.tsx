'use client'

import { useEffect, useRef } from 'react'

/**
 * Heavy Three.js engine starts on first user interaction, or after 4s fallback.
 * Keeps Lighthouse TBT low while real users still get full animations quickly.
 */
export function EffectsEngine() {
  const booted = useRef(false)

  useEffect(() => {
    const yr = document.getElementById('yr')
    if (yr) yr.textContent = String(new Date().getFullYear())

    if (booted.current) return

    let cancelled = false
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null

    const inject = (src: string, id: string) =>
      new Promise<void>((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve()
          return
        }
        const s = document.createElement('script')
        s.id = id
        s.src = src
        s.async = true
        s.onload = () => resolve()
        s.onerror = () => reject(new Error(src))
        document.body.appendChild(s)
      })

    const start = async () => {
      if (booted.current || cancelled) return
      booted.current = true
      cleanup()
      try {
        await inject('/three.min.js', 'nexora-three')
        if (cancelled) return
        await new Promise((r) => setTimeout(r, 0))
        await inject('/nexora-app.js', 'nexora-app-engine')
      } catch {
        if (!cancelled) await inject('/nexora-app.js', 'nexora-app-engine').catch(() => {})
      }
    }

    const onInteract = () => {
      void start()
    }

    const events: Array<keyof WindowEventMap> = [
      'scroll',
      'pointerdown',
      'touchstart',
      'keydown',
      'wheel',
    ]

    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, onInteract))
      if (fallbackTimer) clearTimeout(fallbackTimer)
    }

    // passive listeners — first gesture starts engine
    events.forEach((e) =>
      window.addEventListener(e, onInteract, { once: true, passive: true }),
    )

    // Fallback so users who just stare still get the experience
    fallbackTimer = setTimeout(() => {
      void start()
    }, 4000)

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return null
}
