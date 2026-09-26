import { TESTIMONIALS } from '@/data/testimonials'

const AVATAR = {
  av1: {
    g0: '#3b2a8f',
    g1: '#0d0b30',
    skin: '#e8c9b8',
    hair: '#20141c',
    shirt: '#1c1d3d',
    hairPath:
      'M19 26c0-11 8-15 14-15s13 4 13 15c-3-7-8-9-13-9s-11 2-14 9z',
  },
  av2: {
    g0: '#1e4bb8',
    g1: '#0d0b30',
    skin: '#d9b49b',
    hair: '#2a1d16',
    shirt: '#242646',
    hairPath:
      'M20 24c1-9 7-13 12-13s11 4 12 13c-3-4-7-5-12-5s-9 1-12 5z',
  },
  av3: {
    g0: '#6d28d9',
    g1: '#0d0b30',
    skin: '#c99a7c',
    hair: '#120c14',
    shirt: '#2a2148',
    hairPath:
      'M19 30c-2-14 6-19 13-19s15 5 13 19c-2-6-4-11-13-11s-11 5-13 11z',
  },
} as const

function Avatar({ variant }: { variant: keyof typeof AVATAR }) {
  const a = AVATAR[variant]
  const gid = `g-${variant}`
  return (
    <span className="avatar">
      <svg viewBox="0 0 64 64" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a.g0} />
            <stop offset="1" stopColor={a.g1} />
          </linearGradient>
        </defs>
        <rect width="64" height="64" fill={`url(#${gid})`} />
        <circle cx="32" cy="26" r="11" fill={a.skin} />
        <path d={a.hairPath} fill={a.hair} />
        <path d="M8 64c2-16 12-22 24-22s22 6 24 22z" fill={a.shirt} />
      </svg>
    </span>
  )
}

export function Testimonials() {
  return (
    <section className="sec" id="testimonials">
      <div className="wrap">
        <div className="rv" style={{ marginBottom: 34 }}>
          <div className="eyebrow">Testimonials</div>
          <h2 className="h2">
            Trusted by <span className="grad">visionaries.</span>
          </h2>
        </div>
      </div>
      <div className="carousel" id="tCar">
        <div className="track">
          {TESTIMONIALS.map((t) => (
            <article className="slide t-slide" key={t.name}>
              <div className="t-quote">
                <p>{t.quote}</p>
              </div>
              <div className="t-who">
                <Avatar variant={t.avatar} />
                <div>
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                  <span className="chip">{t.chip}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="dots" id="tDots" />
    </section>
  )
}
