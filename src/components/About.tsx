import { Reveal } from './Reveal'
import { ThreeDMarquee } from './ui/3d-marquee'
import { GlowingEffect } from './ui/glowing-effect'
import { PlaceholderLabel, Section, SectionTitle } from './shared'

// Photographs and VFX shots for the tilted background grid behind the bio
// and portrait. Put the files in public/about/ and list them here, e.g.
// '/about/flower-01.jpg' or '/about/vfx-01.mp4'. Videos (.mp4, .webm, .mov,
// .m4v) play as silent loops; keep them short and small, as several play at
// once. While the list is empty the grid shows placeholder tiles.
const marqueeMedia: string[] = []

// "About" section: bio paragraph with a portrait beside it, over a faint 3D
// grid of photos and VFX shots.
export default function About() {
  return (
    // relative: positions the background grid within the section
    <Section id="about" className="relative py-14 sm:py-20">
      {/* Background: the 3D marquee at 18% opacity, so it reads as texture and
          the portrait stays the focus. Fades out towards the left (behind the
          bio text) and at the top and bottom edges. Decorative, so hidden from
          screen readers and click-through */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18] mask-t-from-70% mask-b-from-70% mask-l-from-50%"
      >
        <ThreeDMarquee items={marqueeMedia} className="h-full max-sm:h-full" />
      </div>

      {/* Section content, layered above the background grid */}
      <div className="relative">
        <SectionTitle>About</SectionTitle>

        {/* Bio + portrait: 7/5 column split from 768px up, stacked on phones */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
          {/* Bio paragraph, capped at 65 characters per line for readability */}
          <div className="space-y-4 md:col-span-7">
            <Reveal as="p" className="max-w-[65ch] text-[17px] leading-[1.65] text-ink">
              I'm 22, finishing my service in a tech unit in the IDF's C4I Corps. Before that I studied networking at Kinneret College
              for two years, which is why I end up running my own servers. I speak Hebrew, Russian and English. Outside code I
              photograph flowers for a local shop and make VFX shots in Blender.
            </Reveal>
          </div>

          {/* Portrait box (up to 280×340), left-aligned under the bio on phones,
              right-aligned on desktop. Replace with an <img>. Fades in just after the bio */}
          <Reveal className="flex justify-start md:col-span-5 md:justify-end" delay={0.1}>
            <div className="relative flex h-[340px] w-full max-w-[280px] flex-col items-center justify-center rounded border border-line bg-panel p-4 text-center">
              {/* Amber highlight that runs along the border, following the pointer */}
              <GlowingEffect disabled={false} spread={40} proximity={64} inactiveZone={0.01} />
              <PlaceholderLabel className="text-[12px]">Portrait placeholder</PlaceholderLabel>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
