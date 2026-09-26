import { SITE } from '@/data/site'
import { Icon } from '@/components/ui/Icon'

export function CTA() {
  return (
    <section className="cta-sec" id="start">
      <div className="wrap">
        <div className="cta rv" id="cta">
          <svg
            className="cta-wave"
            viewBox="0 0 600 200"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="w1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#4f46e5" stopOpacity="0" />
                <stop offset="1" stopColor="#a855f7" stopOpacity=".7" />
              </linearGradient>
              <linearGradient id="w2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#38bdf8" stopOpacity="0" />
                <stop offset="1" stopColor="#6366f1" stopOpacity=".6" />
              </linearGradient>
            </defs>
            <path
              d="M0 200 C120 90 220 190 330 120 S520 30 620 80 V200Z"
              fill="url(#w1)"
            />
            <path
              d="M0 200 C140 140 240 60 360 130 S540 150 620 110 V200Z"
              fill="url(#w2)"
            />
            <path
              d="M0 200 C160 170 280 110 400 160 S560 120 620 150 V200Z"
              fill="rgba(167,139,250,.3)"
            />
          </svg>
          <div className="cta-copy">
            <h2>Ready to build something digital?</h2>
            <p>Tell us what you’re building. We’ll help turn the idea into a digital experience.</p>
          </div>
          <div className="cta-btns">
            <a href={SITE.mailtoProject} className="btn btn-pri">
              Start Your Project <Icon name="arrow" />
            </a>
            <a href={SITE.mailtoConsult} className="btn btn-ghost">
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
