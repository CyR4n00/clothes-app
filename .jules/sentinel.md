## 2024-05-27 - 🛡️ Sentinel: [High] Secure Storage for Authentication Tokens
**Learning:** React Native's `AsyncStorage` is an unencrypted, plaintext key-value store. Storing sensitive authentication tokens (like Supabase session tokens) in it exposes them to local access vulnerabilities.
**Action:** Always use a secure storage solution, such as `expo-secure-store`, for sensitive data on native platforms. Since `expo-secure-store` doesn't support web, implement a platform-aware adapter that gracefully falls back to `AsyncStorage` when `Platform.OS === 'web'`.

## 2024-05-27 - Floating Promises in SecureStore Adapter
**Vulnerability:** The custom `ExpoSecureStoreAdapter` for Supabase auth persistence in React Native omitted `return` statements for `setItem` and `removeItem`, creating floating promises.
**Learning:** Omitting return statements causes the Supabase client to assume instantaneous success and ignore potential SecureStore write failures. This can lead to insecure session states, silent token loss, and unexpected authentication bugs because the client proceeds before the token is securely stored or removed.
**Prevention:** Always explicitly return generated Promises from asynchronous wrapper methods (like those for `SecureStore`), especially when integrating with state management or authentication clients that rely on resolving those promises to guarantee data persistence.
