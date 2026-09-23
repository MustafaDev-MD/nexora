'use client'

import { useState } from 'react'
import { PLANS } from '@/data/pricing'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'

export function Pricing() {
  const [retainer, setRetainer] = useState(false)

  return (
    <section className="sec" id="pricing">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <div className="eyebrow">Pricing</div>
            <h2 className="h2">
              Transparent plans.
              <br />
              <span className="grad">No surprises.</span>
            </h2>
          </div>
          <div className="bill-toggle" role="group" aria-label="Billing type">
            <button
              type="button"
              className={cn(!retainer && 'on')}
              onClick={() => setRetainer(false)}
            >
              One-time
            </button>
            <button
              type="button"
              className={cn(retainer && 'on')}
              onClick={() => setRetainer(true)}
            >
              Retainer
            </button>
          </div>
        </div>

        <div className="price-grid">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={cn('plan rv', plan.featured && 'is-featured')}
            >
              <span className="plan-n">{plan.name}</span>
              <div className="price">
                <b className="amt">{retainer ? plan.retainer : plan.once}</b>
                <i className="per">{retainer ? plan.retainerPer : plan.oncePer}</i>
              </div>
              <p>{plan.blurb}</p>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={cn('btn', plan.featured ? 'btn-pri' : 'btn-ghost')}
              >
                {plan.id === 'scale' ? 'Talk to us' : `Choose ${plan.name}`}
                {plan.featured ? <Icon name="arrow" /> : null}
              </a>
            </article>
          ))}
        </div>
        <p className="price-note rv">
          All plans include hosting setup, launch checklist and a 30-day bug-fix guarantee.
        </p>
      </div>
    </section>
  )
}
