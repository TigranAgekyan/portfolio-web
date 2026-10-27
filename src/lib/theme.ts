import { flushSync } from 'react-dom'

// Light/dark theme. The theme lives in data-theme on <html>, which index.css
// uses to swap the color tokens. The choice is saved in localStorage; a small
// script in index.html applies it before the page paints, so a light-theme
// visitor never sees a flash of dark. Dark is the default.

export type Theme = 'dark' | 'light'

const storageKey = 'theme'

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(storageKey, theme)
  } catch {
    // Storage blocked (private mode etc.): the theme still applies for this visit
  }
}

// Switches to `theme`, revealing it in a circle that grows from the centre of
// `origin` (the toggle button) until it covers the whole window. `onChange`
// updates React state; it runs inside the transition so the new snapshot
// already shows the updated button icon. Browsers without the View
// Transitions API, and visitors with "reduce motion", get an instant switch.
export function switchTheme(theme: Theme, origin: HTMLElement, onChange: (theme: Theme) => void) {
  const change = () => {
    applyTheme(theme)
    flushSync(() => onChange(theme))
  }

  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    change()
    return
  }

  // Circle centre: the middle of the button. End radius: distance to the
  // farthest window corner, so the circle ends up covering everything
  const rect = origin.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  const transition = document.startViewTransition(change)
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
    )
  })
}
