## 2024-05-27 - 🛡️ Sentinel: [High] Secure Storage for Authentication Tokens
**Learning:** React Native's `AsyncStorage` is an unencrypted, plaintext key-value store. Storing sensitive authentication tokens (like Supabase session tokens) in it exposes them to local access vulnerabilities.
**Action:** Always use a secure storage solution, such as `expo-secure-store`, for sensitive data on native platforms. Since `expo-secure-store` doesn't support web, implement a platform-aware adapter that gracefully falls back to `AsyncStorage` when `Platform.OS === 'web'`.

## 2024-06-03 - [CRITICAL] Fix Secure Store Floating Promises
**Vulnerability:** Floating promises in SecureStore adapter
**Learning:** Omitting return statements in a secure storage adapter causes the client (Supabase) to assume instantaneous success and ignore potential keystore failures. This can lead to insecure session states or silent token loss.
**Prevention:** Always explicitly return the generated Promises from asynchronous wrapper methods.
