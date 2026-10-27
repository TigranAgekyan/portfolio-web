import type { MouseEventHandler, ReactNode } from 'react'
import { Reveal } from './Reveal'

// Page section wrapper: content column (max 1020px, centred, 24px side
// padding) with a 1px hairline rule along the top. Used by every section
// after the hero. `className` sets the vertical padding: 56px on phones,
// 80px from 640px up.
export function Section({ id, className = 'py-14 sm:py-20', children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`mx-auto max-w-[1020px] border-t border-line px-6 ${className}`}>
      {children}
    </section>
  )
}

// Section heading ("Work", "About", "Experience"): 28px Bricolage, bold,
// tight letter-spacing. Fades in when scrolled into view. `className` sets
// the space below it (smaller on phones).
export function SectionTitle({ className = 'mb-8 sm:mb-10', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <Reveal as="h2" className="font-display text-[28px] font-bold tracking-tight text-ink">
        {children}
      </Reveal>
    </div>
  )
}

// Amber text link with a small "↗" arrow, for project links such as
// "Live", "Source" and "Watch demo". Underlines on hover.
// `onClick` can intercept the click (e.g. to open the demo window instead).
export function ExternalLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  children: ReactNode
}) {
  return (
    <a href={href} onClick={onClick} className="inline-flex items-center gap-1 text-accent hover:underline">
      <span>{children}</span>
      <span className="text-[12px]">↗</span>
    </a>
  )
}

// Small grey monospace caption inside an image placeholder box
// (e.g. "Portrait placeholder"). Swap the box for a real <img> later.
export function PlaceholderLabel({ className = 'text-[11px]', children }: { className?: string; children: ReactNode }) {
  return <span className={`font-mono text-muted ${className}`}>{children}</span>
}
