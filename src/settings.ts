export type ZooViewerConfig = {
  apiBaseUrl?: string
  webBaseUrl?: string
  docsBaseUrl?: string
  oauthRedirectUrl?: string
  oauthClientId?: string
  apiToken?: string
}

// Settings are optional: static hosts may return a 404 or their HTML fallback.
export async function loadViewerConfig(
  fetchSettings: typeof fetch = fetch,
): Promise<ZooViewerConfig> {
  try {
    const response = await fetchSettings('/settings.json', { cache: 'no-store' })
    if (!response.ok) return {}
    const settings: unknown = await response.json()
    if (!settings || typeof settings !== 'object') return {}
    const config = (settings as { zooViewerConfig?: unknown }).zooViewerConfig
    if (!config || typeof config !== 'object' || Array.isArray(config)) return {}
    const result: ZooViewerConfig = {}
    for (const key of [
      'apiBaseUrl', 'webBaseUrl', 'docsBaseUrl',
      'oauthRedirectUrl', 'oauthClientId', 'apiToken',
    ] as const) {
      const value = (config as Record<string, unknown>)[key]
      if (typeof value === 'string' && value.trim()) result[key] = value.trim()
    }
    return result
  } catch {
    return {}
  }
}
