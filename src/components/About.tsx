import { Reveal } from './Reveal'
import { ThreeDMarquee } from './ui/3d-marquee'
import { HoverBorderGradient } from './ui/hover-border-gradient'
import { Section, SectionTitle } from './shared'

// Photographs and VFX shots for the tilted background grid behind the bio
// and portrait. Every file in src/assets/about/ is picked up automatically,
// in filename order. Tiles are about 400px wide, so ~800px-wide WebP/AVIF
// images are plenty. Videos (.mp4, .webm, .mov, .m4v) play as silent loops;
// keep them short and small, as several play at once. While the folder is
// empty the grid shows placeholder tiles.
const marqueeMedia = Object.values(
  import.meta.glob<string>('../assets/about/*.{webp,avif,jpg,jpeg,png,mp4,webm,mov,m4v}', {
    eager: true,
    import: 'default',
  }),
)

// "About" section: bio paragraph with a portrait beside it, over a faint 3D
// grid of photos and VFX shots.
export default function About() {
  return (
    // relative: positions the background grid within the section
    <Section id="about" className="relative py-14 sm:py-20">
      {/* Background: the 3D marquee in 6 columns (smaller tiles, so more show
          in this short section) at 18% opacity, so it reads as texture and
          the portrait stays the focus. Fades out towards the left (behind the
          bio text), softly at the right edge, and at the top and bottom
          edges. Decorative, so hidden from screen readers and click-through */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18] mask-t-from-70% mask-b-from-70% mask-l-from-50% mask-r-from-80%"
      >
        <ThreeDMarquee items={marqueeMedia} columns={6} className="h-full max-sm:h-full" />
      </div>

      {/* Section content, layered above the background grid */}
      <div className="relative">
        <SectionTitle>About</SectionTitle>

        {/* Bio + portrait: 7/5 column split from 768px up, stacked on phones */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
          {/* Bio paragraph, capped at 65 characters per line for readability */}
          <div className="space-y-4 md:col-span-7">
            <Reveal as="p" className="max-w-[65ch] text-[17px] leading-[1.65] text-ink">
              I'm 22, finishing my service in a tech unit in the IDF. Before that I studied networking and cybersecurity(with additional programming courses) at Kinneret College
              for two years, while also diving deeper in my passion for coding that started when I was a child. Those two things are the reason that I have built my own at-home server, 
              running my own software and services. I speak Hebrew, Russian and English fluently. Outside code I
              love photography and making VFX using Blender, Houdini, C4D, etc'.
            </Reveal>
          </div>

          {/* Portrait (up to 280×340), left-aligned under the bio on phones,
              right-aligned on desktop. Fades in just after the bio */}
          <Reveal className="flex justify-start md:col-span-5 md:justify-end" delay={0.1}>
            {/* Hover Border Gradient: a grey light circles the border, which glows amber on hover */}
            <HoverBorderGradient as="div" containerClassName="h-[340px] w-full max-w-[280px] rounded" className="h-full w-full bg-panel">
              {/* 560px-wide WebP (2× the box) cropped to fill, keeping the face in frame */}
              <img
                src="/img/portrait.webp"
                alt="Portrait of Tigran Agekyan"
                width={560}
                height={747}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full rounded object-cover object-top"
              />
            </HoverBorderGradient>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
