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
    return config as ZooViewerConfig
  } catch {
    return {}
  }
}
