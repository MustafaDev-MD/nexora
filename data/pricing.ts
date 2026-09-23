export type Plan = {
  id: string
  name: string
  blurb: string
  once: string
  retainer: string
  oncePer: string
  retainerPer: string
  featured?: boolean
  features: string[]
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    blurb: 'For founders and small teams launching a clear first presence.',
    once: '$2,499',
    retainer: '$899',
    oncePer: 'one-time project',
    retainerPer: '/ mo retainer',
    features: [
      '5-page marketing website',
      'Mobile-first responsive design',
      'Basic SEO setup',
      'Contact & lead capture forms',
      '2 revision rounds',
      '30-day post-launch support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    blurb: 'For growing brands that need a conversion-focused experience.',
    once: '$5,499',
    retainer: '$1,899',
    oncePer: 'one-time project',
    retainerPer: '/ mo retainer',
    featured: true,
    features: [
      'Custom multi-page website',
      'UI/UX design system',
      'CMS for easy updates',
      'SEO foundation & analytics',
      'eCommerce-ready architecture',
      'Priority support & training',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    blurb: 'For companies with complex platforms and multi-market growth.',
    once: 'Custom',
    retainer: 'Custom',
    oncePer: 'tailored scope',
    retainerPer: 'dedicated team',
    features: [
      'Product / platform design',
      'Custom integrations & automation',
      'Performance & accessibility audit',
      'Ongoing growth partnership',
      'Dedicated project lead',
      'SLA-backed support',
    ],
  },
]
