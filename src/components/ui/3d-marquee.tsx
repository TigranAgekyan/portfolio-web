// Adapted from Aceternity's 3D Marquee (@aceternity/3d-marquee).
// A tilted 3D grid of media in columns (four by default) that drift slowly up and down.
// Changes from the original: takes videos as well as images, shows
// placeholder tiles until media is added, repeats a small set so the grid
// stays full, uses the site's color tokens, has no hover effects (it's meant
// as a background), drops the dashed hairlines between tiles, plays videos
// only while it's on screen, and tilts the grid around its own center (the
// original's top-left offsets pushed most of it out of frame in shorter
// containers).
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

// Files with these extensions render as muted, looping videos; anything else as an image
const videoPattern = /\.(mp4|webm|mov|m4v)$/i

// More columns = smaller tiles, so more of them fit in a small frame
export function ThreeDMarquee({ items, columns: columnCount = 4, className }: { items: string[]; columns?: number; className?: string }) {
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
  // The grid needs about this many tiles to fill the frame (narrower columns
  // hold more tiles each), so shorter lists repeat
  const minTiles = columnCount * (columnCount + 1)
  const tiles: (string | null)[] = items.length
    ? Array.from({ length: Math.max(minTiles, items.length) }, (_, i) => items[i % items.length])
    : Array(minTiles).fill(null)

  // Split the tiles into equal columns
  const chunkSize = Math.ceil(tiles.length / columnCount)
  const columns = Array.from({ length: columnCount }, (_, i) => tiles.slice(i * chunkSize, (i + 1) * chunkSize))

  return (
    <div ref={ref} className={cn('mx-auto block h-[600px] overflow-hidden max-sm:h-100', className)}>
      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{ transform: 'rotateX(55deg) rotateY(0deg) rotateZ(-45deg)', gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
            className="grid size-full gap-8 transform-3d"
          >
            {columns.map((column, colIndex) => (
              // Even columns drift down, odd ones up, at different speeds
              <motion.div
                key={colIndex}
                animate={reduceMotion ? undefined : { y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{ duration: colIndex % 2 === 0 ? 10 : 15, repeat: Infinity, repeatType: 'reverse' }}
                className="flex flex-col items-start gap-8"
              >
                {column.map((src, i) => (
                  <div className="w-full" key={i}>
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
