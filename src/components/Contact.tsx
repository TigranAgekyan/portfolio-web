import { useState } from 'react'
import { GitHubIcon, LinkedInIcon } from './icons'
import { Reveal } from './Reveal'
import { Section } from './shared'

const email = 'business@tigranagekyan.com'

// "Contact" section: big "Say hi." heading, a short note, the email address
// with a copy button, and social links.
export default function Contact() {
  // True for 2 seconds after the copy button is clicked, so it reads "Copied!"
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    // 64px top/bottom padding on phones, 96px from 640px up
    <Section id="contact" className="py-16 sm:py-24">
      {/* Content column, max 650px, 24px between blocks */}
      <div className="max-w-[650px] space-y-6">
        {/* Heading: 40px on phones, 48px from 640px up */}
        <Reveal as="h2" className="font-display text-[40px] font-bold tracking-tight text-ink sm:text-[48px]">
          Say hi.
        </Reveal>

        {/* What to get in touch about, in grey */}
        <Reveal as="p" className="text-[17px] leading-relaxed text-muted" delay={0.07}>
          For junior frontend and full-stack positions starting early 2027, or to talk tech.
        </Reveal>

        {/* Email row: large amber mailto link + small outlined "Copy" button.
            Not animated (nor the social links): visible straight away */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a href={`mailto:${email}`} className="text-[20px] font-medium text-accent hover:underline sm:text-[24px]">
            {email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="rounded border border-line-strong px-2.5 py-1 font-mono text-[12px] text-muted transition-colors hover:border-line-hover hover:text-ink"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Social links: grey icon + label, white on hover, open in a new tab.
            Wrap onto two lines if the screen is too narrow for both */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-[15px]">
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
    </Section>
  )
}
