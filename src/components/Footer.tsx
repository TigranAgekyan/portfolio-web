// Page footer: full-width hairline on top, then one row of small grey
// monospace text (stacks into two centred lines on phones).
export default function Footer() {
  return (
    <footer className="w-full border-t border-line py-10">
      {/* text-center keeps both lines centred when stacked on phones; from 640px up it's one left/right row */}
      <div className="mx-auto flex max-w-[1020px] flex-col items-center justify-between gap-4 px-6 text-center font-mono text-[13px] text-muted sm:flex-row sm:text-left">
        {/* Left: copyright, tech credit and a link to the site's source code */}
        <div>
          © 2026 Tigran Agekyan · Built with React, TypeScript &amp; Framer Motion ·{' '}
          <a href="#" className="text-ink transition-colors hover:text-accent">
            Source
          </a>
        </div>
        {/* Right: location and time zone */}
        <div>Tel Aviv (UTC+2)</div>
      </div>
    </footer>
  )
}
