import { describe, expect, it, vi } from 'vitest'
import { loadViewerConfig } from './settings'

describe('loadViewerConfig', () => {
  it('loads the config object without filtering its properties', async () => {
    const config = {
      apiBaseUrl: ' https://api.example.com/ ',
      webBaseUrl: 'https://example.com',
      docsBaseUrl: 'https://docs.example.com',
      oauthRedirectUrl: 'https://viewer.example.com',
      oauthClientId: 'client',
      apiToken: ' token ',
      unknown: 'ignored by the app',
    }
    expect(await loadViewerConfig(vi.fn(async () => new Response(JSON.stringify({
      zooViewerConfig: config,
    }))))).toEqual(config)
  })

  it.each([
    null, [], {}, { zooViewerConfig: [] }, { zooViewerConfig: null },
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
