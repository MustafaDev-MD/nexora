import type { Metadata } from 'next'
import { SITE } from '@/data/site'
import { STATS } from '@/data/stats'
import {
  ABOUT_HERO,
  ABOUT_STORY,
  ABOUT_VALUES,
  ABOUT_TEAM,
  ABOUT_PILLARS,
} from '@/data/about'
import { IconSprite } from '@/components/ui/IconSprite'
import { Icon } from '@/components/ui/Icon'
import { Shell } from '@/components/layout/Shell'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { EffectsEngine } from '@/components/effects/EffectsEngine'

export const metadata: Metadata = {
  title: `About — ${SITE.name}`,
  description:
    'Learn about Nexora — our story, values and the team behind strategy, design and digital products that convert.',
}

export default function AboutPage() {
  return (
    <>
      <Shell />
      <IconSprite />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="about-hero" id="about-top">
          <div className="about-hero-bg" aria-hidden />
          <div className="wrap">
            <div className="eyebrow">{ABOUT_HERO.eyebrow}</div>
            <h1>
              {ABOUT_HERO.title}{' '}
              <span className="grad">{ABOUT_HERO.titleGrad}</span>
            </h1>
            <p className="lead">{ABOUT_HERO.sub}</p>
            <div className="about-cta-row">
              <a href="/#contact" className="btn btn-pri">
                Start a Project <Icon name="arrow" />
              </a>
              <a href="/#portfolio" className="btn btn-ghost">
                View Work
              </a>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="sec">
          <div className="wrap about-story">
            <div>
              <div className="eyebrow">{ABOUT_STORY.eyebrow}</div>
              <h2 className="h2">{ABOUT_STORY.title}</h2>
            </div>
            <div className="body">
              {ABOUT_STORY.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="stats">
          <div className="wrap">
            <ul className="stats-grid">
              {STATS.map((s) => (
                <li key={s.label}>
                  <span className="num">
                    {s.decimals != null ? s.value.toFixed(s.decimals) : s.value}
                    {s.suffix}
                  </span>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Values */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <div className="eyebrow">Values</div>
                <h2 className="h2">
                  How we work, <span className="grad">every project.</span>
                </h2>
              </div>
            </div>
            <div className="values-grid">
              {ABOUT_VALUES.map((v) => (
                <article className="value-card" key={v.n}>
                  <div className="n">{v.n}</div>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <ul className="icon-row">
              {ABOUT_PILLARS.map((item) => (
                <li key={item.label}>
                  <Icon name={item.icon} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Team */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <div className="eyebrow">Team</div>
                <h2 className="h2">
                  People behind the <span className="grad">craft.</span>
                </h2>
              </div>
            </div>
            <div className="team-grid">
              {ABOUT_TEAM.map((m) => (
                <article className="team-card" key={m.name}>
                  <div
                    className="team-av"
                    style={{ background: m.gradient }}
                    aria-hidden
                  />
                  <h3>{m.name}</h3>
                  <span className="role">{m.role}</span>
                  <p>{m.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-sec">
          <div className="wrap">
            <div className="cta">
              <div className="cta-copy">
                <h2>
                  Ready to build something <span className="grad">great?</span>
                </h2>
                <p>Tell us about your product, brand or growth goal — we reply within one business day.</p>
              </div>
              <div className="cta-btns">
                <a href="/#contact" className="btn btn-pri">
                  Start a Project <Icon name="arrow" />
                </a>
                <a href={SITE.mailtoConsult} className="btn btn-ghost">
                  Book a Call
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <EffectsEngine />
    </>
  )
}
