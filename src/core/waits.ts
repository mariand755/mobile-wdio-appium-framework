/**
 * This helper standardizes explicit waits so tests don’t rely on arbitrary sleeps.
 * Mobile UI timing varies across devices/emulators, so consistent wait patterns reduce flakiness.
 * If a wait ever becomes too slow, you tune timeouts here rather than scattering timing changes across tests.
 */
export const waits = {
  defaultTimeoutMs: 15000,
};
