import { useCallback, useState } from 'react'
import { HomelabStats } from './HomelabStats'
import { ArrowRightIcon } from './icons'
import { openDemoHandler, SimmerDemoWindow, simmerDemoUrl } from './SimmerDemo'
import { CardBody, CardContainer, CardItem } from './ui/3d-card'
import { Reveal, RevealChildren } from './Reveal'
import { GlowingEffect } from './ui/glowing-effect'
import { ExternalLink, Section, SectionTitle } from './shared'


// Steps of the Simmer pipeline diagram, drawn left to right with arrows between them.
const simmerPipeline = ['frontend sends URL', 'backend', 'local transcription', 'LLM returns JSON', 'saved to database']

// Tiles in the Homelab service diagram (2×2 grid): service name + one-line role.
const homelabServices = [
  { name: 'Seafile', role: 'Private cloud storage' },
  { name: 'Paperless-ngx + n8n', role: 'Auto OCR & tagging' },
  { name: 'Trilium Notes', role: 'Hierarchical vault' },
  { name: 'Beszel & Uptime Kuma', role: 'Host telemetry' },
]

// "Work" section: one large featured project (Simmer), then two smaller
// projects side by side (SleepObserver and Homelab).
export default function Work() {
  return (
    <Section id="work">
      <SectionTitle className="mb-10 sm:mb-14">Work</SectionTitle>
      <Simmer />
      {/* Second row: 12-column grid split 6/6 from 768px up, stacked with a
          larger 56px gap below that so the two projects read as separate */}
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
        <SleepObserver />
        <Homelab />
      </div>
    </Section>
  )
}

// Featured project. Text on the left (7 of 12 columns), phone mockup on the
// right (5 columns). Stacks vertically below 768px. A hairline rule below
// separates it from the next row (48px gap on phones, 64px from 640px up).
function Simmer() {
  // Whether the floating demo window is open
  const [demoOpen, setDemoOpen] = useState(false)
  const openDemo = openDemoHandler(() => setDemoOpen(true))
  const closeDemo = useCallback(() => setDemoOpen(false), [])

  return (
    <div className="mb-12 border-b border-line pb-12 sm:mb-16 sm:pb-16">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
        {/* Left: project details. Each block fades in after the one above it */}
        <RevealChildren className="space-y-5 md:col-span-7">
          {/* Title row: project name + outlined year tag */}
          <div className="flex items-center gap-3">
            <h3 className="font-display text-[24px] font-bold text-ink">Simmer</h3>
            <span className="rounded border border-line px-2 py-0.5 font-mono text-[12px] text-muted">2026</span>
          </div>

          {/* Tagline: what the project does, in white, slightly heavier */}
          <p className="text-[17px] leading-snug font-medium text-ink">
            My recipe book. Paste a YouTube link or an article, and it comes back as a clean recipe in my database.
          </p>

          {/* Supporting detail in grey */}
          <p className="max-w-[56ch] text-[15px] leading-relaxed text-muted">
            Personal app I use on my iPhone, self-hosted on my home server.
          </p>

          {/* Pipeline diagram: how a request flows through the system */}
          <div className="pt-2">
            {/* Tiny uppercase caption above the diagram */}
            <span className="mb-2.5 block font-mono text-[11px] tracking-wider text-muted uppercase">Pipeline architecture</span>
            {/* Steps with arrows between them. Phones: a vertical column with
                downward arrows. 640px and up: a horizontal row that wraps */}
            <div className="flex flex-col items-start gap-1.5 font-mono text-[12px] text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
              {simmerPipeline.map((step, i) => (
                // One step plus the arrow after it, kept together so a line
                // never starts with an orphaned arrow when the row wraps
                <div key={step} className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-2">
                  {/* Step box: small outline on a slightly lighter background */}
                  <div className="rounded border border-line bg-panel px-2.5 py-1.5 text-ink">{step}</div>
                  {/* Arrow after every step except the last. Rotated to point down on phones */}
                  {i < simmerPipeline.length - 1 && (
                    <ArrowRightIcon className="ml-3 h-3.5 w-3.5 rotate-90 text-line-hover sm:ml-0 sm:rotate-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack: one monospace line, groups separated by "·" */}
          <div className="pt-2 font-mono text-[12px] leading-relaxed text-muted">
            React, TypeScript, Vite (PWA) · FastAPI, Pydantic · faster-whisper, yt-dlp · Claude Haiku API · PostgreSQL · Docker,
            Caddy, Tailscale
          </div>

          {/* Project links (amber, with ↗). "Try the demo" opens the floating
              demo window (on phones it goes to the full-screen demo page) */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 text-[14px]">
            <ExternalLink href={simmerDemoUrl} onClick={openDemo}>
              Try the demo
            </ExternalLink>
            <ExternalLink href="https://github.com/TigranAgekyan/recipe-app">Source</ExternalLink>
          </div>
        </RevealChildren>

        {/* Right: iPhone frame mockup that tilts toward the mouse (Aceternity
            3D card). Centred on phones, right-aligned on desktop. p-6 adds a
            24px hover zone around the phone so the tilt starts just outside
            it; -m-6 cancels that padding so the layout doesn't move.
            Fades in just after the text column starts */}
        <Reveal className="md:col-span-5" delay={0.1}>
          <CardContainer containerClassName="-m-6 p-6 md:justify-end">
            {/* Phone body: 200×400 on phones, 230×460 from 640px up, large rounded corners and an outline */}
            <CardBody className="relative flex h-[400px] w-[200px] flex-col justify-between rounded-[36px] border border-line-strong bg-panel p-3 select-none sm:h-[460px] sm:w-[230px]">
              {/* Amber highlight that runs along the border, following the pointer */}
              <GlowingEffect disabled={false} spread={40} proximity={64} inactiveZone={0.01} />
              {/* Dynamic-island / notch pill at the top. Lifts furthest on hover */}
              <CardItem translateZ={50} className="mx-auto mt-1 h-4 w-24 rounded-full bg-line" />
              {/* Screen area, lifted slightly off the body. Clicking it opens the
                  demo window (the demo in a new tab on phones); no visible link
                  text, the border brightens on hover. The app screenshot fills the
                  screen, cropped from the top to fit. On hover it blurs and dims
                  behind an "Open Simmer Demo" label */}
              <CardItem
                as="a"
                href={simmerDemoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={openDemo}
                aria-label="Try the Simmer demo"
                translateZ={30}
                className="group relative my-3 w-full flex-1 cursor-pointer overflow-hidden rounded-[24px] border border-line bg-canvas transition-colors hover:border-line-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <img
                  src="/img/screenshot.webp"
                  alt="Simmer app screenshot"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-[filter] duration-300 group-hover:blur-sm group-hover:brightness-75 group-focus-visible:blur-sm group-focus-visible:brightness-75"
                />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[13px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  Open Simmer Demo
                </span>
              </CardItem>
              {/* Home-indicator bar at the bottom */}
              <CardItem translateZ={20} className="mx-auto mb-1 h-1 w-20 rounded-full bg-line" />
            </CardBody>
          </CardContainer>
        </Reveal>
      </div>

      <SimmerDemoWindow open={demoOpen} onClose={closeDemo} />
    </div>
  )
}

// Left half of the second row: SleepObserver with a browser-window mockup.
function SleepObserver() {
  return (
    <RevealChildren className="space-y-4 md:col-span-6">
      {/* Project name */}
      <div className="flex items-center gap-3">
        <h3 className="font-display text-[20px] font-bold text-ink">SleepObserver</h3>
      </div>

      {/* Tagline in white */}
      <p className="text-[15px] leading-relaxed text-ink">Full-stack sleep tracking app with charts.</p>

      {/* Detail in grey: a problem solved on this project */}
      <p className="max-w-[55ch] text-[14px] leading-relaxed text-muted">
        Fixed production routing where Express intercepted '/' before the React static build was served.
      </p>

      {/* Tech stack line */}
      <div className="font-mono text-[12px] text-muted">React, TypeScript, Express, Recharts, deployed on Render</div>

      {/* Project links */}
      <div className="flex items-center gap-4 pt-1 text-[14px]">
        <ExternalLink href="https://sleepobserver.onrender.com">Live</ExternalLink>
        <ExternalLink href="https://github.com/TigranAgekyan/SleepObserver-Final">Source</ExternalLink>
      </div>

      {/* Browser-window mockup for a screenshot. The outer box carries the
          border glow; the inner one clips the address bar to the rounded corners
          (the glow sits on the border, so it can't be inside the clipped box) */}
      <div className="pt-4">
        <div className="relative rounded">
          {/* inset-px: line the glow up with the inner box's 1px border */}
          <GlowingEffect disabled={false} spread={40} proximity={64} inactiveZone={0.01} className="inset-px" />
          <div className="flex h-64 w-full flex-col overflow-hidden rounded border border-line bg-panel">
            {/* Fake address bar showing the site URL */}
            <div className="flex h-6 items-center border-b border-line bg-panel-bar px-3">
              <span className="font-mono text-[10px] text-muted">sleepobserver.onrender.com</span>
            </div>
            {/* Page area. Replace the label with an <img> of the app */}
            <div className="flex flex-1 items-center justify-center">
              <img alt='SleepObserver Image' src='/img/sleepobserver_screenshot.png'/>
            </div>
          </div>
        </div>
      </div>
    </RevealChildren>
  )
}

// Right half of the second row: Homelab with a small service diagram.
function Homelab() {
  return (
    <RevealChildren className="space-y-4 md:col-span-6 md:pl-4">
      {/* Project name */}
      <div className="flex items-center gap-3">
        <h3 className="font-display text-[20px] font-bold text-ink">Homelab</h3>
      </div>

      {/* Tagline in white */}
      <p className="text-[15px] leading-relaxed text-ink">The Ubuntu server in my apartment that runs everything I self-host.</p>

      {/* Detail in grey: what runs on it */}
      <p className="max-w-[55ch] text-[14px] leading-relaxed text-muted">
        Seafile, Paperless-ngx with n8n automatic document tagging, Trilium Notes, Beszel &amp; Uptime Kuma for monitoring, all in
        Docker managed with Dockge, reached privately over Tailscale.
      </p>

      {/* Tech stack line */}
      <div className="font-mono text-[12px] text-muted">Ubuntu Server · Docker · Dockge · Tailscale · Caddy</div>

      {/* Service diagram: outlined box containing a header, a 2×2 grid of services and a footer */}
      <div className="pt-4">
        <div className="w-full rounded border border-line bg-panel p-4">
          {/* Diagram header with live status, then live CPU / memory / disk / uptime from Beszel */}
          <HomelabStats />

          {/* 2×2 grid of service tiles (darker background than the box) */}
          <div className="grid grid-cols-2 gap-2 font-mono text-[12px]">
            {homelabServices.map((service) => (
              <div key={service.name} className="rounded border border-line bg-canvas p-2">
                {/* Service name in white */}
                <span className="block text-ink">{service.name}</span>
                {/* What the service does, tiny and grey */}
                <span className="text-[10px] text-muted">{service.role}</span>
              </div>
            ))}
          </div>

          {/* Diagram footer: the shared infrastructure underneath, hairline above */}
          <div className="mt-2.5 border-t border-line pt-2 text-center font-mono text-[10px] text-muted">
            Real stats pulled from my private network, using Cloudflare Tunneling and Beszel telemetry.
          </div>
        </div>
      </div>
    </RevealChildren>
  )
}
