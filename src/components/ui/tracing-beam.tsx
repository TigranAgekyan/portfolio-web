// Adapted from Aceternity's Tracing Beam (@aceternity/tracing-beam).
// A vertical line beside the content that fills in as you scroll, with a
// checkpoint marker at the heading of every <section id> inside it. The
// filled tip follows the middle of the viewport; a checkpoint lights up
// once the tip has passed it.
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

export function TracingBeam({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Vertical centre of each section's heading, in px from the top of the wrapper
  const [checkpoints, setCheckpoints] = useState<number[]>([])
  // How many checkpoints the beam has reached so far
  const [reached, setReached] = useState(0)

  // Measure the checkpoints, and measure again whenever the content changes
  // size (fonts or images loading, window resized)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const top = el.getBoundingClientRect().top
      const points = Array.from(el.querySelectorAll('section[id]'), (section) => {
        const r = (section.querySelector('h2') ?? section).getBoundingClientRect()
        return r.top - top + r.height / 2
      })
      setCheckpoints(points)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const first = checkpoints[0] ?? 0
  const last = checkpoints[checkpoints.length - 1] ?? 0
  const length = last - first

  // 0 when the first checkpoint is at the middle of the viewport, 1 when the last one is
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start center', 'end center'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 500, damping: 90 })
  const progress = useReducedMotion() ? scrollYProgress : smooth

  useMotionValueEvent(progress, 'change', (p) => {
    const tip = first + p * length
    // +1 so a checkpoint counts as reached right as the tip arrives
    setReached(checkpoints.filter((y) => y <= tip + 1).length)
  })

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      {/* Beam layer: same 1020px column as the sections, so the line sits in
          their left padding (8px in) and, from 1280px up, just outside them */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="relative mx-auto h-full max-w-[1020px]">
          <div className="absolute left-2 xl:-left-8" style={{ top: first, height: length }}>
            {/* Track: the full beam path as a grey hairline */}
            <div ref={trackRef} className="absolute inset-y-0 left-0 w-px bg-line" />
            {/* Fill: amber line growing down the track as you scroll */}
            <motion.div className="absolute inset-y-0 left-0 w-px origin-top bg-accent" style={{ scaleY: progress }} />
          </div>

          {/* Checkpoints: small squares centred on the line, amber once reached */}
          {checkpoints.map((y, i) => (
            <div
              key={i}
              className={cn(
                'absolute left-2 h-[9px] w-[9px] -translate-x-1 -translate-y-1/2 border transition-colors duration-150 xl:-left-8',
                i < reached ? 'border-accent bg-accent' : 'border-line-strong bg-canvas',
              )}
              style={{ top: y }}
            />
          ))}
        </div>
      </div>

      {children}
    </div>
  )
}
