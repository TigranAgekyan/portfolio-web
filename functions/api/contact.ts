// Cloudflare Pages Function behind the Contact form: POST /api/contact with
// JSON { name, email, message, website } sends the message to the inbox via
// Resend. `website` is a honeypot field, hidden from people, so a filled-in
// value means a bot; it gets a fake success and nothing is sent.
//
// Needs the RESEND_API_KEY secret (Pages dashboard > Settings > Variables and
// Secrets; locally in .dev.vars) and tigranagekyan.com verified in Resend,
// since mail is sent from that domain.
import { Resend } from 'resend'

interface Env {
  RESEND_API_KEY: string
}

const to = 'business@tigranagekyan.com'
const from = 'Portfolio contact form <contact@tigranagekyan.com>'

// Upper bounds on each field, so the endpoint can't be used to send huge mails
const limits = { name: 100, email: 254, message: 5000 }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (body: object, status = 200) => Response.json(body, { status })

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid request.' }, 400)
  }

  const field = (key: string) => (typeof body[key] === 'string' ? (body[key] as string).trim() : '')
  const name = field('name')
  const email = field('email')
  const message = field('message')

  if (field('website')) return json({ ok: true })

  if (!name || !email || !message) return json({ error: 'Please fill in your name, email and message.' }, 400)
  if (!emailPattern.test(email)) return json({ error: "That email address doesn't look right." }, 400)
  if (name.length > limits.name || email.length > limits.email || message.length > limits.message) {
    return json({ error: 'That message is too long.' }, 400)
  }

  // Replying in the mail client answers the visitor directly
  const { error } = await new Resend(env.RESEND_API_KEY).emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })
  if (error) {
    console.error('Resend error:', error)
    return json({ error: "The message couldn't be sent. Please email me directly instead." }, 502)
  }
  return json({ ok: true })
}
