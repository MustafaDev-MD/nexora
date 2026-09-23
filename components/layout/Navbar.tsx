import { NAV_LINKS, SITE } from '@/data/site'
import { Icon } from '@/components/ui/Icon'

export function Navbar() {
  return (
    <>
      <header className="nav" id="nav">
        <div className="wrap nav-in">
          <a href="#home" className="logo" aria-label={`${SITE.name} home`}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#lg)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M4 20V6l16 12V4" />
            </svg>
            NEXORA
          </a>
          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.slice(0, 6).map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <span className="nav-pill" aria-hidden />
          </nav>
          <div className="nav-cta">
            <a href="#contact" className="btn btn-pri btn-sm">
              Start a Project <Icon name="arrow" />
            </a>
            <button
              type="button"
              className="burger"
              id="burger"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="mmenu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className="mobile-menu" id="mmenu">
        {NAV_LINKS.map((link) => (
          <a key={link.href} className="m-link" href={link.href}>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="btn btn-pri">
          Start a Project <Icon name="arrow" />
        </a>
      </div>
    </>
  )
}
