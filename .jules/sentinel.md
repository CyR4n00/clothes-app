## 2024-05-27 - 🛡️ Sentinel: [High] Secure Storage for Authentication Tokens
**Learning:** React Native's `AsyncStorage` is an unencrypted, plaintext key-value store. Storing sensitive authentication tokens (like Supabase session tokens) in it exposes them to local access vulnerabilities.
**Action:** Always use a secure storage solution, such as `expo-secure-store`, for sensitive data on native platforms. Since `expo-secure-store` doesn't support web, implement a platform-aware adapter that gracefully falls back to `AsyncStorage` when `Platform.OS === 'web'`.
## 2024-07-31 - [Floating Promises in Secure Storage Adapter]
**Vulnerability:** Floating promises in Supabase's ExpoSecureStoreAdapter (`setItem` and `removeItem` not returning the underlying promises).
**Learning:** Omitting return statements in async storage wrappers creates floating promises, causing the auth client to assume instantaneous success and ignore potential keystore failures, which can lead to insecure session states or silent token loss.
**Prevention:** Always explicitly return the generated Promises from the wrapper methods when implementing a custom secure storage adapter.
