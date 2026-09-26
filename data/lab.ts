export const LAB = {
  eyebrow: 'Nexora Lab',
  title: 'Where strategy meets',
  titleGrad: 'signal.',
  sub: 'A live snapshot of how we think, build and ship — not a pitch deck, a working system.',
} as const

export const LAB_STREAMS = [
  {
    id: '01',
    tag: 'Discover',
    title: 'Signal mapping',
    body: 'We map audience intent, friction points and conversion paths before a single pixel is drawn.',
    metric: '2–3 wks',
    metricLabel: 'typical discovery',
  },
  {
    id: '02',
    tag: 'Design',
    title: 'Interface systems',
    body: 'Component libraries, motion language and brand rules that scale from landing page to product UI.',
    metric: '40+',
    metricLabel: 'reusable patterns',
  },
  {
    id: '03',
    tag: 'Build',
    title: 'Performance stack',
    body: 'Next.js, edge delivery and measured Core Web Vitals — speed treated as a product feature.',
    metric: '<1s',
    metricLabel: 'target LCP',
  },
  {
    id: '04',
    tag: 'Grow',
    title: 'Feedback loops',
    body: 'Analytics, experiments and iteration cycles so the product keeps improving after launch.',
    metric: '3.2×',
    metricLabel: 'avg conversion lift',
  },
] as const
