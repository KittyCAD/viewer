import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['.codex-cache/**', 'node_modules/**', 'dist/**'],
  },
})
