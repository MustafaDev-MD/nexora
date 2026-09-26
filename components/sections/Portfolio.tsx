import { PROJECTS } from '@/data/portfolio'
import { Icon } from '@/components/ui/Icon'

function ProjectVisual({ type }: { type: string }) {
  if (type === 'nextgen') {
    return (
      <div className="laptop">
        <div className="laptop-scr">
          <div className="mini-nav">
            <span>NextGen</span>
            <span>Home · About · Work</span>
          </div>
          <div className="mini-t">Innovation for a smarter tomorrow.</div>
          <svg viewBox="0 0 200 150" aria-hidden>
            <defs>
              <linearGradient id="rb1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#38bdf8" />
                <stop offset="1" stopColor="#7c4dff" />
              </linearGradient>
              <linearGradient id="rb2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c084fc" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path
              d="M20 130C50 20 120 10 190 30 130 55 100 95 80 140Z"
              fill="url(#rb1)"
              opacity=".92"
            />
            <path
              d="M70 135C100 65 145 42 195 74 155 84 138 112 128 145Z"
              fill="url(#rb2)"
              opacity=".9"
            />
          </svg>
        </div>
        <div className="laptop-base" />
      </div>
    )
  }

  if (type === 'lumi') {
    return (
      <div className="lumi">
        <i />
        <i />
        <b>LUMI</b>
      </div>
    )
  }

  return (
    <div className="cordia">
      <small>CORDIA</small>
      <h4>Better Health. Brighter Tomorrow.</h4>
      <svg viewBox="0 0 200 40" aria-hidden>
        <path d="M0 22h50l10-16 14 32 12-24 8 8h106" />
      </svg>
    </div>
  )
}

export function Portfolio() {
  return (
    <section className="sec" id="portfolio">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <div className="eyebrow">Featured Work</div>
            <h2 className="h2">
              Work that speaks
              <br />
              before we do.
            </h2>
            <div className="work-nav">
              <button type="button" className="arrow-btn" data-prev aria-label="Previous project">
                <Icon name="left" />
              </button>
              <button type="button" className="arrow-btn" data-next aria-label="Next project">
                <Icon name="arrow" />
              </button>
            </div>
          </div>
          <a href="#contact" className="link-more">
            View All Projects <Icon name="arrow" />
          </a>
        </div>
      </div>
      <div className="carousel" id="workCar">
        <div className="track">
          {PROJECTS.map((project) => (
            <article className="slide work-slide" key={project.id}>
              <div className="w-visual">
                <ProjectVisual type={project.visual} />
              </div>
              <div className="w-info">
                <h3>{project.name}</h3>
                <span className="cat">{project.category}</span>
                <ul>
                  {project.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p>{project.description}</p>
                <a href="#contact" className="btn btn-ghost btn-sm">
                  View Case Study <Icon name="arrow" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
