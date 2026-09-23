export type Project = {
  id: string
  name: string
  category: string
  tags: string[]
  description: string
  visual: 'nextgen' | 'lumi' | 'cordia'
}

export const PROJECTS: Project[] = [
  {
    id: 'nextgen',
    name: 'NextGen',
    category: 'Technology',
    tags: ['Website Design & Development', 'UI/UX Design', 'Branding'],
    description: 'A modern digital platform built for innovation and growth.',
    visual: 'nextgen',
  },
  {
    id: 'lumi',
    name: 'Lumi',
    category: 'Beauty & Lifestyle',
    tags: ['Brand Identity', 'Logo & Packaging', 'Website Design'],
    description: 'A luxury brand identity and storefront with a calm, confident feel.',
    visual: 'lumi',
  },
  {
    id: 'cordia',
    name: 'Cordia',
    category: 'Healthcare',
    tags: ['UI/UX Design', 'Web Development', 'SEO'],
    description: 'A patient-first website that makes booking and care information simple.',
    visual: 'cordia',
  },
]
