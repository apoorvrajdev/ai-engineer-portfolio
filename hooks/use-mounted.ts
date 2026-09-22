import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * `false` during SSR and hydration, `true` once rendering on the client.
 * Use it to gate client-only output (portals, theme-dependent icons)
 * without a setState-in-effect round trip.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
