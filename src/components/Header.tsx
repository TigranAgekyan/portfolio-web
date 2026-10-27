import { useState } from 'react'
import { getTheme, switchTheme, type Theme } from '@/lib/theme'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './icons'

// Section links shown in the top navigation bar (and in the mobile menu).
const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

// Top bar, fixed to the top of the screen: 56px tall, semi-transparent
// charcoal with a background blur, and a hairline rule along the bottom.
export default function Header() {
  // Whether the mobile dropdown menu (below 640px) is open.
  const [menuOpen, setMenuOpen] = useState(false)
  // Current color theme. Starts from whatever index.html applied on load
  const [theme, setTheme] = useState<Theme>(getTheme)
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    // While the mobile menu is open the bar turns fully opaque, so page text
    // doesn't show through behind the menu links
    <header
      className={`fixed top-0 right-0 left-0 z-50 border-b border-line backdrop-blur-md ${menuOpen ? 'bg-canvas' : 'bg-canvas/85'}`}
    >
      {/* Inner row: same 1020px column as the page, name on the left, links on the right */}
      <div className="mx-auto flex h-14 max-w-[1020px] items-center justify-between px-6">
        {/* Name / logo: links back to the top of the page, turns amber on hover */}
        <a
          href="#"
          onClick={() => setMenuOpen(false)}
          className="font-display text-[17px] font-semibold tracking-tight text-ink transition-colors hover:text-accent"
        >
          Tigran Agekyan
        </a>

        {/* Right-hand group: nav links + language/theme controls */}
        <div className="flex items-center gap-7">
          {/* Section navigation (640px and up): grey links that turn white on hover.
              On phones these move into the dropdown menu below. */}
          <nav className="hidden items-center gap-6 text-[14px] text-muted sm:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-ink">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Language switcher + theme toggle (+ menu button on phones),
              set off by a vertical hairline on the left */}
          <div className="flex items-center gap-3 border-l border-line pl-4 font-mono text-[13px] text-muted">
            {/* Current language, shown in white */}
            <span className="text-ink">EN</span>
            {/* Dim dot separating the two languages */}
            <span className="text-separator">·</span>
            {/* Link to the Hebrew version (not built yet, so href is "#") */}
            <a href="#" title="Hebrew version" className="transition-colors hover:text-ink">
              עב
            </a>
            {/* Light/dark theme toggle. Shows the theme it switches to (sun in
                dark, moon in light); the new theme opens in a circle from here */}
            <button
              type="button"
              aria-label={`Switch to ${nextTheme} theme`}
              title={`Switch to ${nextTheme} theme`}
              onClick={(e) => switchTheme(nextTheme, e.currentTarget, setTheme)}
              className="ml-2 flex items-center text-muted transition-colors hover:text-ink"
            >
              {theme === 'dark' ? <SunIcon className="h-[17px] w-[17px]" /> : <MoonIcon className="h-[17px] w-[17px]" />}
            </button>
            {/* Hamburger / close button. Phones only (hidden from 640px up);
                -mr-2 + p-2 enlarge the tap area without shifting the icon */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="-mr-2 flex items-center p-2 text-muted transition-colors hover:text-ink sm:hidden"
            >
              {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu: full-width list of section links under the bar,
          each row separated by a hairline. Only rendered while open, never from 640px up */}
      {menuOpen && (
        <nav id="mobile-menu" className="border-t border-line px-6 sm:hidden">
          {navLinks.map((link) => (
            // One menu row: large tap target (48px tall), closes the menu when tapped
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex h-12 items-center border-b border-line text-[16px] text-muted transition-colors last:border-b-0 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
