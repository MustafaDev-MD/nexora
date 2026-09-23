'use client'

import { useEffect, useRef, useState } from 'react'
import { CLIENTS, STATS } from '@/data/stats'

function useCountUp(end: number, decimals = 0, suffix = '', enabled = false) {
  const [text, setText] = useState('0' + suffix)
  const started = useRef(false)

  useEffect(() => {
    if (!enabled || started.current) return
    started.current = true
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setText(end.toFixed(decimals) + suffix)
      return
    }
    const t0 = performance.now()
    const dur = 1600
    let raf = 0
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur)
      const e = 1 - Math.pow(1 - p, 3)
      setText((end * e).toFixed(decimals) + suffix)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [enabled, end, decimals, suffix])

  return text
}

function StatItem({
  value,
  suffix,
  decimals = 0,
  label,
  enabled,
}: {
  value: number
  suffix: string
  decimals?: number
  label: string
  enabled: boolean
}) {
  const text = useCountUp(value, decimals, suffix, enabled)
  return (
    <li className="rv">
      <b className="num">{text}</b>
      <span>{label}</span>
    </li>
  )
}

export function Stats() {
  const ref = useRef<HTMLUListElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="stats" id="stats" aria-label="Key numbers">
      <div className="wrap">
        <ul className="stats-grid rv-group" ref={ref}>
          {STATS.map((s) => (
            <StatItem
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              decimals={'decimals' in s ? s.decimals : 0}
              label={s.label}
              enabled={inView}
            />
          ))}
        </ul>
        <div className="clients" aria-label="Trusted by">
          <span className="clients-label">Trusted by forward-thinking teams</span>
          <div className="clients-track">
            <ul className="clients-set">
              {[...CLIENTS, ...CLIENTS].map((c, i) => (
                <li key={`${c}-${i}`} aria-hidden={i >= CLIENTS.length || undefined}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
