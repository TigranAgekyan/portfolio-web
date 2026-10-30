// Adapted from Aceternity's Hover Border Gradient (@aceternity/hover-border-gradient).
// A 1px border with a soft light that keeps circling it; on hover the light
// stops and the whole border glows amber.
// Changes from the original: the site's theme colors (a grey light, amber on
// hover) instead of white and blue, so it works in light mode too; any shape
// (corners come from containerClassName, no pill-shaped mask); the content
// is a <span> (unless rendered as a <div>) so it can sit inside links and buttons; the amber glow is its
// own layer that fades in, so the colors can be CSS variables; and
// `highlighted` keeps the glow on, e.g. for a selected item.
import { useEffect, useState, type ElementType, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'

// Order the light travels in (counter-clockwise when read forwards)
const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']

// A soft grey light sitting on one edge of the border
const edgeLight = (shape: string) => `radial-gradient(${shape}, var(--color-muted) 0%, transparent 100%)`
const movingMap: Record<Direction, string> = {
  TOP: edgeLight('20.7% 50% at 50% 0%'),
  LEFT: edgeLight('16.6% 43.1% at 0% 50%'),
  BOTTOM: edgeLight('20.7% 50% at 50% 100%'),
  RIGHT: edgeLight('16.2% 41.2% at 100% 50%'),
}

// The hover glow: amber across the whole border
const highlight = 'radial-gradient(75% 181% at 50% 50%, var(--color-accent) 0%, transparent 100%)'

type Props = {
  children: ReactNode
  // Element to render as: 'button' (default), 'a', 'div', 'span', …
  as?: ElementType
  // Outer element: the border. Set the corner radius and size here
  containerClassName?: string
  // Inner element: the content. Give it an opaque background, or the glow shows through
  className?: string
  // Seconds the light spends on each edge
  duration?: number
  clockwise?: boolean
  // Keep the amber glow on without hovering
  highlighted?: boolean
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
} & HTMLAttributes<HTMLElement>

export function HoverBorderGradient({
  children,
  as: Tag = 'button',
  containerClassName,
  className,
  duration = 1,
  clockwise = true,
  highlighted = false,
  onMouseEnter,
  onMouseLeave,
  ...props
}: Props) {
  const [hovered, setHovered] = useState(false)
  const [direction, setDirection] = useState<Direction>('TOP')
  const glowing = hovered || highlighted
  // A <div> can hold block content; inside links and buttons the content must be a <span>
  const Inner = Tag === 'div' ? 'div' : 'span'

  // Move the light to the next edge every `duration` seconds, pausing while glowing
  useEffect(() => {
    if (glowing) return
    const interval = setInterval(() => {
      setDirection((current) => {
        const i = directions.indexOf(current)
        return directions[clockwise ? (i - 1 + directions.length) % directions.length : (i + 1) % directions.length]
      })
    }, duration * 1000)
    return () => clearInterval(interval)
  }, [glowing, clockwise, duration])

  return (
    <Tag
      onMouseEnter={(event: MouseEvent<HTMLElement>) => {
        setHovered(true)
        onMouseEnter?.(event)
      }}
      onMouseLeave={(event: MouseEvent<HTMLElement>) => {
        setHovered(false)
        onMouseLeave?.(event)
      }}
      className={cn('relative flex w-fit rounded-full bg-line-strong p-px', containerClassName)}
      {...props}
    >
      {/* Content, on top of both lights so only the 1px border shows them */}
      <Inner className={cn('relative z-10 block rounded-[inherit]', className)}>{children}</Inner>
      {/* The moving grey light */}
      <motion.span
        aria-hidden
        className="absolute inset-0 z-0 rounded-[inherit]"
        style={{ filter: 'blur(2px)' }}
        initial={{ background: movingMap[direction] }}
        animate={{ background: movingMap[direction] }}
        transition={{ ease: 'linear', duration }}
      />
      {/* The amber glow, faded in on hover */}
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-500',
          glowing ? 'opacity-100' : 'opacity-0',
        )}
        style={{ background: highlight, filter: 'blur(2px)' }}
      />
    </Tag>
  )
}
