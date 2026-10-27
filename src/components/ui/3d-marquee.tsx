// Adapted from Aceternity's 3D Marquee (@aceternity/3d-marquee).
// A tilted 3D grid of media in four columns that drift slowly up and down.
// Changes from the original: takes videos as well as images, shows
// placeholder tiles until media is added, repeats a small set so the grid
// stays full, uses the site's color tokens, has no hover effects (it's meant
// as a background), and plays videos only while it's on screen.
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

// Files with these extensions render as muted, looping videos; anything else as an image
const videoPattern = /\.(mp4|webm|mov|m4v)$/i

// The grid needs about this many tiles to fill the frame, so shorter lists repeat
const minTiles = 20

export function ThreeDMarquee({ items, className }: { items: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  // Play the videos only while the marquee is on screen, to save battery and
  // CPU. With "reduce motion" on they stay paused
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const videos = Array.from(el.querySelectorAll('video'))
    if (reduceMotion) {
      videos.forEach((video) => video.pause())
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      videos.forEach((video) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [items, reduceMotion])

  // null = placeholder tile (shown while `items` is empty)
  const tiles: (string | null)[] = items.length
    ? Array.from({ length: Math.max(minTiles, items.length) }, (_, i) => items[i % items.length])
    : Array(minTiles).fill(null)

  // Split the tiles into 4 equal columns
  const chunkSize = Math.ceil(tiles.length / 4)
  const columns = Array.from({ length: 4 }, (_, i) => tiles.slice(i * chunkSize, (i + 1) * chunkSize))

  return (
    <div ref={ref} className={cn('mx-auto block h-[600px] overflow-hidden max-sm:h-100', className)}>
      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{ transform: 'rotateX(55deg) rotateY(0deg) rotateZ(-45deg)' }}
            className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d"
          >
            {columns.map((column, colIndex) => (
              // Even columns drift down, odd ones up, at different speeds
              <motion.div
                key={colIndex}
                animate={reduceMotion ? undefined : { y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{ duration: colIndex % 2 === 0 ? 10 : 15, repeat: Infinity, repeatType: 'reverse' }}
                className="flex flex-col items-start gap-8"
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {column.map((src, i) => (
                  <div className="relative w-full" key={i}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <Tile src={src} />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// One tile: a video, an image, or (src = null) an empty placeholder box
function Tile({ src }: { src: string | null }) {
  const className = 'aspect-[970/700] w-full rounded-lg object-cover'
  if (!src) return <div className={cn(className, 'border border-line bg-panel')} />
  if (videoPattern.test(src)) {
    // Played/paused by ThreeDMarquee depending on visibility. muted + playsInline
    // are required for silent autoplay on iOS
    return <video src={src} className={className} muted loop playsInline preload="metadata" />
  }
  return <img src={src} alt="" className={className} loading="lazy" decoding="async" />
}

// Dashed hairlines between the tiles, fading out at both ends
function GridLineHorizontal({ className, offset }: { className?: string; offset?: string }) {
  return (
    <div
      style={
        {
          '--height': '1px',
          '--width': '5px',
          '--fade-stop': '90%',
          '--offset': offset || '200px',
          maskComposite: 'exclude',
        } as React.CSSProperties
      }
      className={cn(
        'absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]',
        'bg-[linear-gradient(to_right,var(--color-line-hover),var(--color-line-hover)_50%,transparent_0,transparent)]',
        '[background-size:var(--width)_var(--height)]',
        '[mask:linear-gradient(to_left,black_var(--fade-stop),transparent),_linear-gradient(to_right,black_var(--fade-stop),transparent),_linear-gradient(black,black)]',
        '[mask-composite:exclude]',
        'z-30',
        className,
      )}
    />
  )
}

function GridLineVertical({ className, offset }: { className?: string; offset?: string }) {
  return (
    <div
      style={
        {
          '--height': '5px',
          '--width': '1px',
          '--fade-stop': '90%',
          '--offset': offset || '150px',
          maskComposite: 'exclude',
        } as React.CSSProperties
      }
      className={cn(
        'absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]',
        'bg-[linear-gradient(to_bottom,var(--color-line-hover),var(--color-line-hover)_50%,transparent_0,transparent)]',
        '[background-size:var(--width)_var(--height)]',
        '[mask:linear-gradient(to_top,black_var(--fade-stop),transparent),_linear-gradient(to_bottom,black_var(--fade-stop),transparent),_linear-gradient(black,black)]',
        '[mask-composite:exclude]',
        'z-30',
        className,
      )}
    />
  )
}
