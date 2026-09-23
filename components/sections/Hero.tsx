import { HERO_FEATURES, HERO_INDEX, SITE } from '@/data/site'
import { Icon } from '@/components/ui/Icon'

export function Hero() {
  return (
    <section className="hero" id="home" data-hero>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">{SITE.tagline}</div>
          <h1>
            <span>We don’t just build websites.</span>
            <span className="grad">We build digital experiences.</span>
          </h1>
          <p className="hero-sub">
            Web design, eCommerce, branding and digital solutions engineered to help businesses
            stand out, connect with customers and grow online.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn btn-pri">
              Start Your Project <Icon name="arrow" />
            </a>
            <a href="#portfolio" className="btn btn-ghost">
              Explore Our Work
            </a>
          </div>
          <div className="hero-trust">
            <span className="avs">
              <i />
              <i />
              <i />
            </span>
            <span>
              <span className="stars">★★★★★</span> <b>4.9/5</b> from 60+ client reviews
            </span>
          </div>
          <ul className="hero-feats">
            <li>
              <Icon name="monitor" />
              <span>
                Creative Design
                <br />
                &amp; Development
              </span>
            </li>
            <li>
              <Icon name="brand" />
              <span>
                Branding &amp;
                <br />
                Digital Growth
              </span>
            </li>
            <li>
              <Icon name="support" />
              <span>
                Automation
                <br />
                &amp; Ongoing Support
              </span>
            </li>
          </ul>
        </div>
        <div className="orb-wrap" id="orbAnchor" aria-hidden>
          <canvas id="orb" />
          <div className="orb-tag">
            <b>Ideas</b>
            <b>Websites</b>
            <b>Growth</b>
          </div>
        </div>
      </div>
      <div className="hero-idx" id="idx" aria-label="Section progress">
        {HERO_INDEX.map((item, i) => (
          <button
            key={item.href}
            type="button"
            className={i === 0 ? 'on' : undefined}
            data-t={item.href}
            aria-label={item.aria}
          >
            {item.label}
          </button>
        ))}
      </div>
      <a className="scroll-down" href="#about">
        <i>
          <Icon name="down" />
        </i>
        Scroll Down
      </a>
    </section>
  )
}
