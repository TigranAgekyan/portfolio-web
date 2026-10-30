// Adapted from Aceternity's Stateful Button (@aceternity/stateful-button).
// A button that grows a spinner while something is in progress, then swaps it
// for a checkmark that shrinks away after 2 seconds.
// Changes from the original: driven by a `state` prop instead of its own
// click handler (so it works as a form's submit button, and a failed or
// blocked submit never shows the checkmark), named StatefulButton (ui/button
// already exports Button), no shared layoutId, and the site's amber
// primary-button look instead of the green pill, turning green on success.
import { useEffect, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion, useAnimate } from 'motion/react'
import { cn } from '@/lib/utils'

export type StatefulButtonState = 'idle' | 'loading' | 'success'

const shown = { width: '20px', scale: 1, display: 'block' }
const hidden = { width: '0px', scale: 0, display: 'none' }

// Motion's own drag/animation handlers clash with the DOM ones, so they're left out
type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> & {
  state: StatefulButtonState
  children: ReactNode
}

export function StatefulButton({ state, className, children, ...props }: ButtonProps) {
  const [scope, animate] = useAnimate()

  // loading: show the spinner. Otherwise hide it, and on success show the
  // checkmark for 2 seconds. `cancelled` stops a stale sequence once the
  // state changes again
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      if (state === 'loading') {
        await animate('.check', hidden, { duration: 0 })
        await animate('.loader', shown, { duration: 0.2 })
        return
      }
      await animate('.loader', hidden, { duration: 0.2 })
      if (state !== 'success' || cancelled) return
      await animate('.check', shown, { duration: 0.2 })
      if (cancelled) return
      await animate('.check', hidden, { delay: 2, duration: 0.2 })
    }
    run()
    return () => {
      cancelled = true
    }
  }, [state, animate])

  return (
    <motion.button
      layout
      ref={scope}
      className={cn(
        'flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded px-5 py-2.5 text-[15px] font-medium text-on-accent transition-colors',
        state === 'success' ? 'bg-success hover:bg-success-hover' : 'bg-accent hover:bg-accent-hover',
        className,
      )}
      {...props}
    >
      <motion.div layout className="flex items-center gap-2">
        <Loader />
        <CheckIcon />
        <motion.span layout>{children}</motion.span>
      </motion.div>
    </motion.button>
  )
}

// Spinning open circle, shown while loading
function Loader() {
  return (
    <motion.svg
      animate={{ rotate: [0, 360] }}
      initial={hidden}
      style={{ scale: 0.5, display: 'none' }}
      transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  )
}

// Circled checkmark, shown briefly on success
function CheckIcon() {
  return (
    <motion.svg
      initial={hidden}
      style={{ scale: 0.5, display: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  )
}
