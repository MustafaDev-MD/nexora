'use client'

import { useState } from 'react'
import { FAQS } from '@/data/faq'

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
          {FAQS.map((item, i) => (
            <details
              key={item.q}
              className="faq rv"
              open={open === i}
              onToggle={(e) => {
                const el = e.currentTarget
                if (el.open) setOpen(i)
                else if (open === i) setOpen(null)
              }}
            >
              <summary>
                {item.q}
                <i />
              </summary>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
