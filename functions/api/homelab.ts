// Cloudflare Pages Function behind the Homelab card's live stats:
// GET /api/homelab returns the home server's current status from the Beszel
// hub, trimmed to what the card shows:
// { status, cpu, memory, disk, uptime, updated } (percentages, uptime in
// seconds). Each answer is cached for 30 seconds, so visitors never hit the
// hub more often than that.
//
// Beszel's API needs a login, so this signs in as a read-only Beszel user.
// Needs these variables (Pages dashboard > Settings > Variables and Secrets;
// locally in .dev.vars):
//   BESZEL_URL       the hub's public address, e.g. https://beszel.tigranagekyan.com
//   BESZEL_EMAIL     a Beszel user with the "readonly" role
//   BESZEL_PASSWORD  that user's password (as a secret)
//   BESZEL_SYSTEM    the server's name as shown in Beszel
interface Env {
  BESZEL_URL: string
  BESZEL_EMAIL: string
  BESZEL_PASSWORD: string
  BESZEL_SYSTEM: string
}

// Parts of a Beszel `systems` record used here. `info` keys are Beszel's
// short names: u = uptime (s), cpu / mp / dp = CPU / memory / disk use (%)
interface BeszelSystem {
  status: 'up' | 'down' | 'paused' | 'pending'
  updated: string
  info: { u?: number; cpu?: number; mp?: number; dp?: number }
}

const cacheSeconds = 30

// Workers' shared edge cache (not in the DOM's CacheStorage type)
const edgeCache = () => (caches as unknown as { default: Cache }).default

export async function onRequestGet({ request, env }: { request: Request; env: Env }) {
  const cache = edgeCache()
  const cached = await cache.match(request)
  if (cached) return cached

  let response: Response
  try {
    response = Response.json(await fetchStats(env), { headers: { 'Cache-Control': `public, max-age=${cacheSeconds}` } })
  } catch (error) {
    console.error('Beszel error:', error)
    return Response.json({ error: 'Stats unavailable.' }, { status: 502 })
  }
  await cache.put(request, response.clone())
  return response
}

async function fetchStats(env: Env) {
  const hub = env.BESZEL_URL.replace(/\/$/, '')

  // Beszel runs on PocketBase: sign in for a token, then read the system record
  const auth = await fetch(`${hub}/api/collections/users/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: env.BESZEL_EMAIL, password: env.BESZEL_PASSWORD }),
  })
  if (!auth.ok) throw new Error(`sign-in failed (${auth.status})`)
  const { token } = (await auth.json()) as { token: string }

  const filter = encodeURIComponent(`name="${env.BESZEL_SYSTEM.replace(/"/g, '')}"`)
  const records = await fetch(`${hub}/api/collections/systems/records?filter=${filter}&perPage=1`, {
    headers: { Authorization: token },
  })
  if (!records.ok) throw new Error(`systems request failed (${records.status})`)
  const [system] = ((await records.json()) as { items: BeszelSystem[] }).items
  if (!system) throw new Error(`no system named "${env.BESZEL_SYSTEM}"`)

  const { info } = system
  return {
    status: system.status,
    cpu: info.cpu ?? null,
    memory: info.mp ?? null,
    disk: info.dp ?? null,
    uptime: info.u ?? null,
    updated: system.updated,
  }
}
