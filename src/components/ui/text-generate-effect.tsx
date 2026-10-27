// Adapted from Aceternity's Text Generate Effect (@aceternity/text-generate-effect).
// Renders `words` as a paragraph whose words fade in one after another,
// each coming into focus from a slight blur and settling down a few pixels
// from just above. Plays once on mount. Text styles come from `className`;
// with "reduce motion" turned on, the text simply appears.
import { Fragment, useEffect } from 'react'
import { motion, stagger, useAnimate, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
  wordDelay = 0.06,
  offsetY = 3,
  delay = 0,
}: {
  words: string
  className?: string
  filter?: boolean // blur each word in
  duration?: number // seconds each word takes to appear
  wordDelay?: number // seconds between one word starting and the next
  offsetY?: number // px each word starts above its final position
  delay?: number // seconds before the first word starts
}) {
  const [scope, animate] = useAnimate()
  const reduceMotion = useReducedMotion()
  const wordsArray = words.split(' ')

  useEffect(() => {
    animate(
      'span',
      { opacity: 1, y: 0, filter: filter ? 'blur(0px)' : 'none' },
      reduceMotion ? { duration: 0 } : { duration, delay: stagger(wordDelay, { startDelay: delay }), ease: 'easeOut' },
    )
  }, [animate, filter, duration, wordDelay, delay, reduceMotion])

  return (
    <p ref={scope} className={cn(className)}>
      {wordsArray.map((word, idx) => (
        // inline-block so the vertical offset applies. The space sits outside
        // the span because inline-block drops its own trailing whitespace
        <Fragment key={word + idx}>
          <motion.span
            className="inline-block opacity-0"
            style={{ y: -offsetY, filter: filter ? 'blur(8px)' : 'none' }}
          >
            {word}
          </motion.span>{' '}
        </Fragment>
      ))}
    </p>
  )
}
