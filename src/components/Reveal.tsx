import { Children, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

// Elements Reveal can render as, so it can replace a tag in place without
// adding a wrapper (which would break grid column spans, for example)
const tags = { div: motion.div, p: motion.p, h1: motion.h1, h2: motion.h2 }

// Fades an element in while it comes into focus from a light blur and
// settles 3px down, matching the hero intro's word-by-word effect. By
// default it plays once, when the element scrolls into view; `onMount`
// plays it on page load instead (for the hero). `delay` is in seconds.
// With "reduce motion" turned on, the element is simply visible.
export function Reveal({
  as = 'div',
  className,
  delay = 0,
  onMount = false,
  children,
}: {
  as?: keyof typeof tags
  className?: string
  delay?: number
  onMount?: boolean
  children: ReactNode
}) {
  const reduceMotion = useReducedMotion()
  const Tag = tags[as]
  const shown = { opacity: 1, y: 0, filter: 'blur(0px)' }

  return (
    <Tag
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: -3, filter: 'blur(4px)' }}
      // Scroll trigger fires once the element is 60px above the bottom of the
      // window, so it's clearly on screen when it plays. once: no replay on scroll-up
      {...(onMount ? { animate: shown } : { whileInView: shown, viewport: { once: true, margin: '0px 0px -60px 0px' } })}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </Tag>
  )
}

// A div whose direct children each Reveal in turn, `step` seconds apart
// (capped at 0.3s so long lists don't lag). Each child gets its own wrapper
// div, so use it on stacked (space-y) content, not on grids.
export function RevealChildren({ className, step = 0.07, children }: { className?: string; step?: number; children: ReactNode }) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, i) => (
        <Reveal key={i} delay={Math.min(i * step, 0.3)}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
