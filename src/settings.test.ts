import { describe, expect, it, vi } from 'vitest'
import { loadViewerConfig } from './settings'

describe('loadViewerConfig', () => {
  it('loads the supported settings and ignores invalid fields', async () => {
    const config = {
      apiBaseUrl: ' https://api.example.com/ ',
      webBaseUrl: 'https://example.com',
      docsBaseUrl: 'https://docs.example.com',
      oauthRedirectUrl: 'https://viewer.example.com',
      oauthClientId: 'client',
      apiToken: ' token ',
    }
    expect(await loadViewerConfig(vi.fn(async () => new Response(JSON.stringify({
      zooViewerConfig: { ...config, unknown: 'ignored' },
    }))))).toEqual({ ...config, apiBaseUrl: config.apiBaseUrl.trim(), apiToken: 'token' })
  })

  it.each([
    null, [], {}, { zooViewerConfig: [] }, { zooViewerConfig: null },
    { zooViewerConfig: { apiToken: 123, apiBaseUrl: false, oauthClientId: ' ' } },
  ])('ignores invalid settings: %j', async settings => {
    expect(await loadViewerConfig(vi.fn(async () => new Response(JSON.stringify(settings))))).toEqual({})
  })

  it.each([
    () => new Response('missing', { status: 404 }),
    () => new Response('unavailable', { status: 500 }),
    () => new Response('<html>static host fallback</html>'),
    () => { throw new TypeError('Failed to fetch') },
  ])('falls back when settings cannot be loaded', async response => {
    expect(await loadViewerConfig(vi.fn(async () => response()))).toEqual({})
  })
})
