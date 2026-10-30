import { useState, type FormEvent } from 'react'
import { GitHubIcon, LinkedInIcon } from './icons'
import { Reveal } from './Reveal'
import { Section } from './shared'
import { HoverBorderGradient } from './ui/hover-border-gradient'
import { StatefulButton } from './ui/stateful-button'

const email = 'business@tigranagekyan.com'

// Starting text for the message box, with [brackets] to fill in or delete
const messageTemplate = `Hi Tigran,

I'm reaching out from [company] about a [role] position.

[A few words about the role, or what you'd like to talk about]

Thanks!`

// Shared look of the text inputs and the message box: dark panel, 1px
// border that lightens on hover, amber outline when focused
const inputClass =
  'w-full rounded border border-line-strong bg-panel px-3 py-2.5 text-[15px] text-ink placeholder:text-muted transition-colors hover:border-line-hover focus-visible:border-accent focus-visible:outline-none'

type Status = { state: 'idle' | 'sending' | 'sent' } | { state: 'error'; message: string }

// "Contact" section: big "Say hi." heading and a short note, then a form that
// emails me (through /api/contact, see functions/api/contact.ts) beside the
// email address with a copy button and social links.
export default function Contact() {
  // True for 2 seconds after the copy button is clicked, so it reads "Copied!"
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus({ state: 'sending' })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error)
      form.reset()
      setStatus({ state: 'sent' })
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : "The message couldn't be sent."
      setStatus({ state: 'error', message })
    }
  }

  return (
    // 64px top/bottom padding on phones, 96px from 640px up
    <Section id="contact" className="py-16 sm:py-24">
      {/* Heading and note, max 650px, 24px between them */}
      <div className="max-w-[650px] space-y-6">
        {/* Heading: 40px on phones, 48px from 640px up */}
        <Reveal as="h2" className="font-display text-[40px] font-bold tracking-tight text-ink sm:text-[48px]">
          Say hi.
        </Reveal>

        {/* What to get in touch about, in grey */}
        <Reveal as="p" className="text-[17px] leading-relaxed text-muted" delay={0.07}>
          For junior frontend and full-stack positions starting early 2027, or to talk tech.
        </Reveal>
      </div>

      {/* Form + email/socials: 7/5 column split from 768px up, stacked on phones */}
      <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-12">
        <form onSubmit={sendMessage} className="space-y-4 md:col-span-7">
          {/* Name and email side by side from 640px up */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="font-mono text-[12px] text-muted">Name</span>
              <input name="name" required maxLength={100} autoComplete="name" className={inputClass} />
            </label>
            <label className="block space-y-1.5">
              <span className="font-mono text-[12px] text-muted">Email</span>
              <input name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} />
            </label>
          </div>

          {/* Message box, prefilled with the template */}
          <label className="block space-y-1.5">
            <span className="font-mono text-[12px] text-muted">Message</span>
            <textarea
              name="message"
              required
              maxLength={5000}
              rows={9}
              defaultValue={messageTemplate}
              className={`${inputClass} resize-y leading-relaxed`}
            />
          </label>

          {/* Honeypot: hidden from people and screen readers, so only bots fill it in */}
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

          {/* Send button (spinner while sending, checkmark once sent) + result
              line. aria-live announces the result, which fades in like the
              rest of the page's text */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            {/* Hover Border Gradient around the button: a light circling the border, glowing amber on hover */}
            <HoverBorderGradient as="div" containerClassName="rounded">
              <StatefulButton
                type="submit"
                state={status.state === 'sending' ? 'loading' : status.state === 'sent' ? 'success' : 'idle'}
                disabled={status.state === 'sending'}
              >
                Send message
              </StatefulButton>
            </HoverBorderGradient>
            <div aria-live="polite" className="text-[14px]">
              {status.state === 'sent' && <Reveal className="text-ink">Thanks, your message is on its way.</Reveal>}
              {status.state === 'error' && <Reveal className="text-destructive">{status.message}</Reveal>}
            </div>
          </div>
        </form>

        {/* Manual alternative: the email address with a copy button, then social links */}
        <div className="space-y-6 md:col-span-5">
          <div className="space-y-2">
            <p className="text-[15px] text-muted">Or you can mail me manually at</p>
            {/* Email row: amber mailto link + small "Copy" button with a Hover Border Gradient */}
            <div className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${email}`} className="break-all text-[18px] font-medium text-accent hover:underline">
                {email}
              </a>
              <HoverBorderGradient
                type="button"
                onClick={copyEmail}
                containerClassName="rounded"
                className="bg-canvas px-2.5 py-1 font-mono text-[12px] text-muted transition-colors hover:text-ink"
              >
                {copied ? 'Copied!' : 'Copy'}
              </HoverBorderGradient>
            </div>
          </div>

          {/* Social links: grey icon + label, white on hover, open in a new tab.
              Wrap onto two lines if the column is too narrow for both */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
            <a
              href="https://github.com/TigranAgekyan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
            >
              <GitHubIcon className="h-4 w-4" />
              <span>GitHub (TigranAgekyan)</span>
            </a>
            {/* LinkedIn: put the profile URL in href */}
            <a href="#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink">
              <LinkedInIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
