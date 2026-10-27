import { RevealChildren } from './Reveal'
import { Section, SectionTitle } from './shared'

// Rows of the experience list: role/place on the left, years on the right.
const entries = [
  { title: 'IDF, C4I Corps — Field Network Technician', years: '2024–2027' },
  {
    title: 'Kinneret College — Networking & CyberSecurity studies, with many bonus Programming Courses',
    years: '2022–2024',
  },
]

// "Experience" section: a plain text list, no cards.
export default function Experience() {
  return (
    <Section id="experience">
      <SectionTitle>Experience</SectionTitle>

      {/* List, max 680px wide, 24px between rows. Rows fade in one after another */}
      <RevealChildren className="max-w-[680px] space-y-6">
        {entries.map((entry) => (
          // One row: title and years side by side from 640px up (stacked on phones)
          <div key={entry.title} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            {/* Role and place */}
            <span className="text-[17px] font-medium text-ink">{entry.title}</span>
            {/* Years, grey monospace. shrink-0 + nowrap keep "2022–2024" on one line */}
            <span className="shrink-0 font-mono text-[13px] whitespace-nowrap text-muted">{entry.years}</span>
          </div>
        ))}
      </RevealChildren>
    </Section>
  )
}
