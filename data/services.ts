export type Service = {
  id: number
  icon: string
  title: string
  description: string
}

export const SERVICES: Service[] = [
  {
    id: 1,
    icon: 'monitor',
    title: 'Website Design & Development',
    description:
      'Custom responsive websites designed around your brand, audience and goals.',
  },
  {
    id: 2,
    icon: 'cart',
    title: 'eCommerce Development',
    description:
      'Conversion-focused online stores with product management, checkout and automation.',
  },
  {
    id: 3,
    icon: 'brand',
    title: 'Branding & Logo Design',
    description:
      'Visual identities including logos, colors, typography and brand systems.',
  },
  {
    id: 4,
    icon: 'seo',
    title: 'SEO & Digital Growth',
    description:
      'Technical optimization, content strategy, on-page SEO and digital growth solutions.',
  },
  {
    id: 5,
    icon: 'ux',
    title: 'UI/UX Design',
    description:
      'User-focused interfaces designed to make digital experiences intuitive and engaging.',
  },
  {
    id: 6,
    icon: 'auto',
    title: 'Business Automation',
    description:
      'Automated customer journeys, lead capture, follow-ups, notifications and workflows.',
  },
]
