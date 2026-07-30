## 2024-05-27 - 🛡️ Sentinel: [High] Secure Storage for Authentication Tokens
**Learning:** React Native's `AsyncStorage` is an unencrypted, plaintext key-value store. Storing sensitive authentication tokens (like Supabase session tokens) in it exposes them to local access vulnerabilities.
**Action:** Always use a secure storage solution, such as `expo-secure-store`, for sensitive data on native platforms. Since `expo-secure-store` doesn't support web, implement a platform-aware adapter that gracefully falls back to `AsyncStorage` when `Platform.OS === 'web'`.

## 2024-05-28 - 🛡️ Sentinel: [High] Floating Promises in Secure Storage Wrapper
**Vulnerability:** Floating promises in `setItem` and `removeItem` of the secure storage adapter for Supabase.
**Learning:** Omitting the `return` statement in wrappers for async storage functions creates floating promises. The client (e.g., Supabase auth) assumes instantaneous success and ignores keystore failures, leading to potential insecure session states or silent token loss.
**Prevention:** Always explicitly return the generated Promises from wrapper methods for asynchronous storage operations.
