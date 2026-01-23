/**
 * This file centralizes credential/test-user data so tests remain readable and changes are made in one place.
 * For real apps, we typically pull these from a secure secret store or CI variables. For this sample app,
 * we keep them here because the sample credentials are stable and intended for automation demonstrations.
 * Deterministic credentials prevent flaky failures and make reports consistent.
 */
export const credentials = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
} as const;
