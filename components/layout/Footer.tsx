import { FOOTER_LINKS, SITE } from '@/data/site'
import { Icon } from '@/components/ui/Icon'

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <a href="/" className="logo" aria-label={`${SITE.name} home`}>
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
          <nav className="foot-links" aria-label="Footer">
            {FOOTER_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="socials">
            <a href="#" aria-label="LinkedIn">
              in
            </a>
            <a href="#" aria-label="X">
              X
            </a>
            <a href="#" aria-label="Instagram">
              <Icon name="ig" />
            </a>
            <a href="#" aria-label="Dribbble">
              <Icon name="dribbble" />
            </a>
          </div>
        </div>
        <div className="foot-bot">
          <span>
            © <span id="yr">2026</span> {SITE.name}. All rights reserved.
          </span>
          <nav>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
