export function Preloader() {
  return (
    <div id="preloader" aria-hidden="true">
      <svg className="pl-mark" viewBox="0 0 24 24">
        <path d="M4 20V6l16 12V4" />
      </svg>
      <div className="pl-bar">
        <i />
      </div>
    </div>
  )
}

// 'use client'

// import { useEffect } from 'react'

// /**
//  * Hides independently of the 3D engine (engine may start later for performance).
//  * Short fixed duration so first paint feels fast.
//  */
// export function Preloader() {
//   useEffect(() => {
//     const el = document.getElementById('preloader')
//     if (!el) return

//     const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
//     const delay = reduce ? 120 : 550

//     const t = window.setTimeout(() => {
//       el.classList.add('hide')
//       window.setTimeout(() => {
//         if (el.parentNode) el.parentNode.removeChild(el)
//       }, 600)
//     }, delay)

//     return () => clearTimeout(t)
//   }, [])

//   return (
//     <div id="preloader" aria-hidden="true">
//       <svg className="pl-mark" viewBox="0 0 24 24">
//         <defs>
//           <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0%" stopColor="#a78bfa" />
//             <stop offset="100%" stopColor="#38bdf8" />
//           </linearGradient>
//         </defs>
//         <path d="M4 20V6l16 12V4" />
//       </svg>
//       <div className="pl-bar">
//         <i />
//       </div>
//     </div>
//   )
// }
