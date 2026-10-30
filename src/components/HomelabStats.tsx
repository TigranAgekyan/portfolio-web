import { useEffect, useState } from 'react'

// What /api/homelab returns (see functions/api/homelab.ts): Beszel's status
// for the server, percentages, and uptime in seconds
type Stats = {
  status: 'up' | 'down' | 'paused' | 'pending'
  cpu: number | null
  memory: number | null
  disk: number | null
  uptime: number | null
}

// The endpoint caches for 30 seconds, so polling faster gains nothing
const pollMs = 30_000

// Status dot colour and label for each state. "loading" = first request
// still in flight, "error" = the endpoint couldn't reach Beszel (or isn't
// running, as under `npm run dev`)
const statusLook = {
  up: { dot: 'bg-success', label: 'Live · Beszel' },
  down: { dot: 'bg-destructive', label: 'Offline' },
  paused: { dot: 'bg-muted', label: 'Monitoring paused' },
  pending: { dot: 'bg-muted', label: 'Connecting…' },
  loading: { dot: 'bg-muted', label: 'Connecting…' },
  error: { dot: 'bg-muted', label: 'Stats unavailable' },
}

// Fetches the stats on mount, then every 30 seconds while the tab is visible
function useHomelabStats() {
  const [stats, setStats] = useState<Stats | 'loading' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      if (document.hidden) return
      try {
        const response = await fetch('/api/homelab')
        if (!response.ok) throw new Error()
        const data = (await response.json()) as Stats
        if (!cancelled) setStats(data)
      } catch {
        if (!cancelled) setStats('error')
      }
    }
    load()
    const timer = setInterval(load, pollMs)
    // Refresh straight away when coming back to the tab
    document.addEventListener('visibilitychange', load)
    return () => {
      cancelled = true
      clearInterval(timer)
      document.removeEventListener('visibilitychange', load)
    }
  }, [])

  return stats
}

// "12d 4h", "4h 20m" or "20m"
function formatUptime(seconds: number) {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (days) return `${days}d ${hours}h`
  if (hours) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

// Top of the Homelab diagram: live status on the left, OS on the right, then
// a row of CPU / memory / disk / uptime readings from Beszel. Shows dashes
// until (or unless) stats arrive
export function HomelabStats() {
  const stats = useHomelabStats()
  const look = statusLook[typeof stats === 'string' ? stats : stats.status]
  const live = typeof stats === 'object' && stats.status === 'up' ? stats : null

  const readings = [
    { label: 'CPU', percent: live?.cpu },
    { label: 'Memory', percent: live?.memory },
    { label: 'Disk', percent: live?.disk },
    { label: 'Uptime', text: live?.uptime != null ? formatUptime(live.uptime) : undefined },
  ]

  return (
    <>
      {/* Header: status dot + label on the left, OS on the right, hairline below */}
      <div className="mb-3 flex justify-between border-b border-line pb-2 font-mono text-[11px] text-muted">
        <span className="inline-flex items-center gap-2">
          {/* Dot, with a soft pulse ring while live */}
          <span className="relative flex h-2 w-2">
            {live && <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 motion-safe:animate-ping" />}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${look.dot}`} />
          </span>
          {look.label}
        </span>
        <span>Ubuntu 24.04 LTS</span>
      </div>

      {/* Readings: label, value, and a thin amber bar for percentages */}
      <div className="mb-2 grid grid-cols-4 gap-2 font-mono">
        {readings.map((reading) => (
          <div key={reading.label} className="rounded border border-line bg-canvas p-2">
            <span className="block text-[10px] text-muted">{reading.label}</span>
            <span className="block text-[12px] text-ink tabular-nums">
              {'text' in reading ? (reading.text ?? '—') : reading.percent != null ? `${Math.round(reading.percent)}%` : '—'}
            </span>
            {'percent' in reading && (
              <div className="mt-1.5 h-0.5 w-full rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-700"
                  style={{ width: `${Math.min(reading.percent ?? 0, 100)}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
