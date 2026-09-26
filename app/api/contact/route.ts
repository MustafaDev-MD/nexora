import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

function clean(v: unknown, max = 500) {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

export async function POST(req: NextRequest) {
  let raw: Record<string, unknown>
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid body' }, { status: 400 })
  }

  if (clean(raw.website)) {
    return NextResponse.json({ ok: true, id: 'ok' })
  }

  const name = clean(raw.name, 120)
  const email = clean(raw.email, 200)
  const message = clean(raw.message, 4000)
  const company = clean(raw.company, 200)
  const service = clean(raw.service, 80)
  const budget = clean(raw.budget, 80)

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: 'Please enter your name.' }, { status: 422 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 422 })
  }
  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: 'Please tell us a bit more about the project.' },
      { status: 422 }
    )
  }

  const id = crypto.randomUUID()
  console.log('lead', { id, name, email, company, service, budget, message })

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO
  if (key && to) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM || 'Nexora <onboarding@resend.dev>',
          to: [to],
          reply_to: email,
          subject: `New lead: ${name}${service ? ` · ${service}` : ''}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Company: ${company || '-'}`,
            `Service: ${service || '-'}`,
            `Budget: ${budget || '-'}`,
            '',
            message,
            '',
            `ID: ${id}`,
          ].join('\n'),
        }),
      })
    } catch (e) {
      console.error('Resend failed', e)
    }
  }

  return NextResponse.json({ ok: true, id })
}
