import { IconSprite } from '@/components/ui/IconSprite'
import { Preloader } from '@/components/layout/Preloader'
import { Shell } from '@/components/layout/Shell'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Portfolio } from '@/components/sections/Portfolio'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Pricing } from '@/components/sections/Pricing'
import { FAQ } from '@/components/sections/FAQ'
import { Blog } from '@/components/sections/Blog'
import { CTA } from '@/components/sections/CTA'
import { Contact } from '@/components/sections/Contact'
import { EffectsEngine } from '@/components/effects/EffectsEngine'

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Shell />
      <IconSprite />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Blog />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <EffectsEngine />
    </>
  )
}
