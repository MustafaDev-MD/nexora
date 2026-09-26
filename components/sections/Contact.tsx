'use client'

import { FormEvent, useState } from 'react'
import { SITE } from '@/data/site'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'

const SERVICES = [
  { label: 'Website', value: 'Website Design' },
  { label: 'eCommerce', value: 'eCommerce' },
  { label: 'Branding', value: 'Branding' },
  { label: 'SEO & Growth', value: 'SEO & Growth' },
  { label: 'UI/UX', value: 'UI/UX Design' },
  { label: 'Automation', value: 'Automation' },
]

const BUDGETS = ['$1k – $5k', '$5k – $15k', '$15k+', 'Not sure yet']

type FormState = {
  name: string
  email: string
  company: string
  service: string
  budget: string
  message: string
  website: string
}

const initial: FormState = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: '',
  website: '',
}

export function Contact() {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [toast, setToast] = useState<string | null>(null)

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (form.name.trim().length < 2) {
      setToast('Please enter your name.')
      setStatus('error')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      setToast('Enter a valid email.')
      setStatus('error')
      return
    }
    if (form.message.trim().length < 10) {
      setToast('Please tell us a bit more about the project.')
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          page: typeof window !== 'undefined' ? window.location.href : '',
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed')
      setStatus('sent')
      setToast("Thanks — we'll reply within one business day.")
      setForm(initial)
    } catch (err) {
      setStatus('error')
      setToast(err instanceof Error ? err.message : 'Could not send.')
    }
    setTimeout(() => setToast(null), 3600)
  }

  return (
    <section className="sec" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-copy rv">
          <div className="eyebrow">Contact</div>
          <h2 className="h2">
            Let's build <span className="grad">something great.</span>
          </h2>
          <p>
            Tell us about your project, timeline and goals. We'll come back with a clear plan and
            next steps.
          </p>
          <ul className="contact-meta">
            <li>
              <span className="mi">
                <Icon name="mail" />
              </span>
              <div>
                <b>Email</b>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
            </li>
            <li>
              <span className="mi">
                <Icon name="pin" />
              </span>
              <div>
                <b>Studio</b>
                <span>Remote-first · Worldwide</span>
              </div>
            </li>
            <li>
              <span className="mi">
                <Icon name="phone" />
              </span>
              <div>
                <b>Response time</b>
                <span>Within one business day</span>
              </div>
            </li>
          </ul>
          <div className="avail">
            <i />
            Currently accepting new projects
          </div>
        </div>

        <form className="cform rv" onSubmit={onSubmit} noValidate>
          <div className="f-body">
            <div className="f-row">
              <label className="field">
                <span>Your name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={(e) => setField('name', e.target.value)}
                  placeholder="Jane Doe"
                  required
                />
              </label>
              <label className="field">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  placeholder="jane@company.com"
                  required
                />
              </label>
            </div>
            <label className="field">
              <span>Company (optional)</span>
              <input
                name="company"
                value={form.company}
                onChange={(e) => setField('company', e.target.value)}
                placeholder="Company name"
              />
            </label>
            <div className="field">
              <span>What do you need?</span>
              <div className="chips" role="group" aria-label="Service">
                {SERVICES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    className={cn('chip-btn', form.service === s.value && 'on')}
                    onClick={() => setField('service', s.value)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <span>Budget range</span>
              <div className="chips" role="group" aria-label="Budget">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={cn('chip-btn', form.budget === b && 'on')}
                    onClick={() => setField('budget', b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <label className="field">
              <span>Project details</span>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={(e) => setField('message', e.target.value)}
                placeholder="Goals, timeline, anything we should know…"
                required
              />
            </label>
            <input
              className="hp"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setField('website', e.target.value)}
              aria-hidden
            />
          </div>
          <div className="f-foot">
            <button type="submit" className="btn btn-pri" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Send message'} <Icon name="arrow" />
            </button>
            <p className="f-note">No spam — reply within one business day.</p>
          </div>
        </form>
      </div>
      {toast && (
        <div className={cn('toast show', status === 'error' && 'err')} role="status">
          {toast}
        </div>
      )}
    </section>
  )
}
