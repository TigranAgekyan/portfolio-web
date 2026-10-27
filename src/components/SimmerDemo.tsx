import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { PlaceholderLabel } from './shared'

// Where the Simmer demo build lives (public/simmer-demo/, see `npm run demo:sync`)
export const simmerDemoUrl = '/simmer-demo/'

// Width the demo is laid out at: an iPhone's screen width in CSS pixels.
// The app always renders at this width and is scaled down to fit the frame,
// so its layout matches a real phone instead of squeezing into a narrower one
const deviceWidth = 390

// Click handler for links to the demo. From 640px up it opens the floating
// window instead of following the link; on phones the link opens the demo
// full screen in a new tab, since a phone-sized window wouldn't fit there.
export function openDemoHandler(open: () => void) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(min-width: 640px)').matches) {
      e.preventDefault()
      open()
    }
  }
}

// Floating window with the live Simmer demo in a phone-shaped frame, over a
// dimmed page. Closes on Esc or a click outside. Focus moves to the window
// on open and back to whatever opened it on close.
export function SimmerDemoWindow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    // Stop the page behind from scrolling while the window is open
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      opener?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        // z-[60]: above the fixed header (z-50)
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          {/* Dimmed, blurred page behind the window. Clicking it closes the window */}
          <div className="absolute inset-0 bg-canvas/80 backdrop-blur-sm" onClick={onClose} />

          {/* The window: phone-proportioned (390×844 like an iPhone screen),
              shrunk to fit short windows, settling in from 8px above */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Simmer demo. Press Escape to close"
            tabIndex={-1}
            className="relative flex aspect-[390/844] h-[min(844px,calc(100dvh-3rem))] flex-col outline-none"
            initial={{ y: reduceMotion ? 0 : -8, scale: reduceMotion ? 1 : 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: reduceMotion ? 0 : -8, scale: reduceMotion ? 1 : 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
          >
            {/* Phone frame around the app, matching the Work section's mockup */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-[44px] border border-line-strong bg-panel p-2.5">
              <div className="relative flex-1 overflow-hidden rounded-[34px] border border-line bg-canvas">
                {/* Shown until the app paints over it */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlaceholderLabel>Loading demo…</PlaceholderLabel>
                </div>
                <ScaledFrame onEscape={onClose} />
              </div>
            </div>

            {/* Caption under the phone */}
            <p className="mt-3 text-center font-mono text-[11px] text-muted">Demo with sample recipes · imports are simulated</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// The demo iframe, laid out at deviceWidth and scaled to fill its container.
// Its height is set so that, once scaled, it fills the container exactly.
// Key presses inside the demo don't reach this page, so Esc is also listened
// for inside the iframe (possible because the demo is on the same origin)
function ScaledFrame({ onEscape }: { onEscape: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scale = size ? size.width / deviceWidth : 1

  return (
    <div ref={ref} className="absolute inset-0">
      {size && (
        <iframe
          src={simmerDemoUrl}
          title="Simmer demo"
          onLoad={(e) =>
            e.currentTarget.contentWindow?.addEventListener('keydown', (key) => key.key === 'Escape' && onEscape())
          }
          className="origin-top-left border-0"
          style={{ width: deviceWidth, height: size.height / scale, transform: `scale(${scale})` }}
        />
      )}
    </div>
  )
}
