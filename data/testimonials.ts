export type Testimonial = {
  quote: string
  name: string
  role: string
  chip: string
  avatar: 'av1' | 'av2' | 'av3'
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Their team understood our vision and turned it into a beautiful, high-performing website. The process was smooth, creative and professional from start to finish.',
    name: 'Sarah Mitchell',
    role: 'Founder, Lumi',
    chip: 'Website Design',
    avatar: 'av1',
  },
  {
    quote:
      'The level of creativity and technical expertise is outstanding. Our new website has made a real difference for our business.',
    name: 'James Carter',
    role: 'CEO, NextGen',
    chip: 'eCommerce',
    avatar: 'av2',
  },
  {
    quote:
      'Organic traffic doubled in four months. They treat growth as a system to build, not a one-off campaign.',
    name: 'Aisha Rahman',
    role: 'Head of Growth, Vantage',
    chip: 'SEO & Growth',
    avatar: 'av3',
  },
]
