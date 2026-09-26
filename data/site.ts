export const SITE = {
  name: 'Nexora',
  tagline: 'Digital Agency',
  title: 'Nexora — Digital Agency',
  description:
    'Nexora is a digital agency for web design, eCommerce, branding and business automation.',
  email: 'hello@nexora.agency',
  mailtoProject: 'mailto:hello@nexora.agency?subject=New%20project',
  mailtoConsult: 'mailto:hello@nexora.agency?subject=Consultation%20request',
} as const

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#portfolio', label: 'Work' },
  { href: '/#lab', label: 'Lab' },
  { href: '/#process', label: 'Process' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
] as const

export const FOOTER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#process', label: 'Process' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
] as const

export const HERO_FEATURES = [
  { icon: 'monitor', label: 'Creative Design\n& Development' },
  { icon: 'brand', label: 'Branding &\nDigital Growth' },
  { icon: 'support', label: 'Automation\n& Ongoing Support' },
] as const

export const HERO_INDEX = [
  { href: '#home', label: '01', aria: 'Go to hero' },
  { href: '#about', label: '02', aria: 'Go to approach' },
  { href: '#services', label: '03', aria: 'Go to services' },
  { href: '#portfolio', label: '04', aria: 'Go to portfolio' },
] as const

export const APPROACH_ITEMS = [
  { icon: 'layers', label: 'Strategy' },
  { icon: 'brand', label: 'Design' },
  { icon: 'code', label: 'Development' },
  { icon: 'target', label: 'Branding' },
  { icon: 'auto', label: 'Automation' },
  { icon: 'growth', label: 'Digital Growth' },
] as const

export const MARQUEE_ITEMS = [
  'Design',
  'Development',
  'Branding',
  'eCommerce',
  'SEO',
  'Automation',
  'Digital Growth',
] as const
