## 2024-05-27 - 🛡️ Sentinel: [High] Secure Storage for Authentication Tokens
**Learning:** React Native's `AsyncStorage` is an unencrypted, plaintext key-value store. Storing sensitive authentication tokens (like Supabase session tokens) in it exposes them to local access vulnerabilities.
**Action:** Always use a secure storage solution, such as `expo-secure-store`, for sensitive data on native platforms. Since `expo-secure-store` doesn't support web, implement a platform-aware adapter that gracefully falls back to `AsyncStorage` when `Platform.OS === 'web'`.
## 2024-07-23 - [Floating Promises in Secure Storage]
**Vulnerability:** Floating promises in `setItemAsync` and `deleteItemAsync` wrappers meant client assumed synchronous success without catching keystore failures.
**Learning:** Returning promises explicitly from storage wrappers is critical in asynchronous React Native environments to avoid silent token loss or inconsistent auth states.
**Prevention:** Always return the Promise or `await` operations on device secure storage to ensure errors bubble up appropriately.
