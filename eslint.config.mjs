import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  // game/ is a separate app (its own dependencies and build); keep it out of this one.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'resource/**', 'game/**']),
])
