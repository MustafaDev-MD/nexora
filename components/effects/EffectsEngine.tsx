'use client'

import { useEffect, useRef } from 'react'

/**
 * Defer Three.js + animation engine until after load + idle.
 * Cuts Total Blocking Time on Lighthouse / mid-range devices.
 * Visual result is the same — engine just starts ~0.5–1.5s later.
 */
export function EffectsEngine() {
  const booted = useRef(false)

  useEffect(() => {
    const yr = document.getElementById('yr')
    if (yr) yr.textContent = String(new Date().getFullYear())

    if (booted.current) return
    booted.current = true

    let cancelled = false

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
      if (cancelled) return
      try {
        await inject('/three.min.js', 'nexora-three')
        if (cancelled) return
        // yield one frame before heavy engine parse
        await new Promise((r) => setTimeout(r, 0))
        if (cancelled) return
        await inject('/nexora-app.js', 'nexora-app-engine')
      } catch {
        // still try engine (has 2D orb fallback)
        if (!cancelled) await inject('/nexora-app.js', 'nexora-app-engine').catch(() => {})
      }
    }

    const schedule = () => {
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      }
      if (typeof w.requestIdleCallback === 'function') {
        w.requestIdleCallback(() => { void start() }, { timeout: 2500 })
      } else {
        setTimeout(() => { void start() }, 400)
      }
    }

    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })

    return () => {
      cancelled = true
    }
  }, [])

  return null
}