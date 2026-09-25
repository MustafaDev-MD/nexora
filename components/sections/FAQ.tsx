'use client'

import { useState } from 'react'
import { FAQS } from '@/data/faq'
import { cn } from '@/lib/utils'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="sec" id="faq">
      <div className="wrap faq-wrap">
        <div className="faq-intro rv">
          <div className="eyebrow">FAQ</div>
          <h2 className="h2">
            Answers before you <span className="grad">reach out.</span>
          </h2>
          <p>
            Quick answers about timelines, process, tech and how we work. Still unsure? Jump to
            contact and we will walk you through it.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className={cn('faq rv', isOpen && 'is-open')}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <i aria-hidden />
                </button>
                <div className="faq-panel" aria-hidden={!isOpen}>
                  <div className="faq-a">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}