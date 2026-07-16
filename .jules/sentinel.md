## 2024-05-27 - 🛡️ Sentinel: [High] Secure Storage for Authentication Tokens
**Learning:** React Native's `AsyncStorage` is an unencrypted, plaintext key-value store. Storing sensitive authentication tokens (like Supabase session tokens) in it exposes them to local access vulnerabilities.
**Action:** Always use a secure storage solution, such as `expo-secure-store`, for sensitive data on native platforms. Since `expo-secure-store` doesn't support web, implement a platform-aware adapter that gracefully falls back to `AsyncStorage` when `Platform.OS === 'web'`.
## 2024-05-28 - 🛡️ Sentinel: [Medium] Fix insecure floating promises in auth storage
**Vulnerability:** The custom SecureStore adapter for Supabase auth was not returning the Promises from `setItemAsync` and `deleteItemAsync`.
**Learning:** This creates floating promises, which causes the Supabase client to assume instantaneous success and ignore potential storage/encryption failures, potentially leading to insecure session state or silent token loss.
**Prevention:** Always return the Promise when wrapping async storage methods in synchronous-looking objects for third-party clients.
