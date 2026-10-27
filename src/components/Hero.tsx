// Hero: the first thing on the page. Availability line, big name,
// one-sentence intro, and the call-to-action buttons.
import { Reveal } from './Reveal'
import { BackgroundRippleEffect } from './ui/background-ripple-effect'
import { TextGenerateEffect } from './ui/text-generate-effect'

export default function Hero() {
  return (
    // Full-width wrapper so the grid spans the whole window, not just the
    // 1020px content column. overflow-hidden crops the grid at the edges
    <div className="relative w-full overflow-hidden">
      {/* Interactive grid behind the hero: cells brighten on hover, and a
          click sends a ripple outward. Fades out from the top centre, and
          the bottom 40% fades to nothing so it doesn't end in a hard edge
          against the Work section */}
      <BackgroundRippleEffect className="mask-b-from-60%" />

      {/* Top/bottom padding: 64/56px on phones, 96/80px from 640px up.
          z-10 keeps the content above the grid. pointer-events-none lets
          clicks fall through to the grid; the buttons switch it back on */}
      <section className="pointer-events-none relative z-10 mx-auto max-w-[1020px] px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
        {/* Text column, capped at 760px so the name and intro don't stretch full width */}
        <div className="max-w-[760px]">
          {/* Entrance on page load, top to bottom: eyebrow, name (0.1s), intro
              word by word (from 0.2s), then the buttons (1.2s) as it finishes */}

          {/* Eyebrow: small grey monospace availability note above the name */}
          <Reveal as="p" onMount className="mb-6 font-mono text-[13px] text-muted">
            Available from February 2027
          </Reveal>

          {/* Name: the largest text on the page. 44px on small phones, 52px from 400px, 68px from 640px up */}
          <Reveal as="h1" onMount delay={0.1} className="font-display text-[44px] leading-[1.05] min-[400px]:text-[52px] font-bold tracking-tight text-ink sm:text-[68px]">
            Tigran Agekyan
          </Reveal>

          {/* Intro sentence in grey, max 620px wide for comfortable reading.
              Words fade in one by one, settling down from just above */}
          <TextGenerateEffect
            delay={0.2}
            className="mt-6 max-w-[620px] text-[18px] leading-relaxed text-muted sm:text-[20px]"
            words="I build web apps, and the servers they run on. Frontend developer in Tel Aviv, available from February 2027."
          />

          {/* Call-to-action row. Wraps onto two lines on narrow screens */}
          <Reveal onMount delay={1.2} className="pointer-events-auto mt-10 flex w-fit flex-wrap items-center gap-4">
            {/* Primary button: solid amber, scrolls down to the Work section */}
            <a
              href="#work"
              className="inline-flex items-center rounded bg-accent px-5 py-2.5 text-[15px] font-medium text-on-accent transition-colors hover:bg-accent-hover"
            >
              See my work
            </a>

            {/* Résumé download and its language picker, kept together */}
            <div className="inline-flex items-center gap-2">
              {/* Secondary (ghost) button: transparent with an outline. Link the PDF here */}
              <a
                href="#"
                className="inline-flex items-center rounded border border-line-strong px-4 py-2.5 text-[15px] text-ink transition-colors hover:border-line-hover"
              >
                Résumé (PDF)
              </a>

              {/* Résumé language: EN (amber = selected) · עב (Hebrew) */}
              <span className="pl-1 font-mono text-[12px] text-muted">
                <a href="#" className="text-accent hover:underline">
                  EN
                </a>
                <span className="text-line-hover"> · </span>
                <a href="#" className="text-muted hover:underline">
                  עב
                </a>
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
