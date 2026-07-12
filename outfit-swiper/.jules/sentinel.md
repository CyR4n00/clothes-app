## 2025-02-15 - Insecure Storage of Authentication Tokens
**Vulnerability:** Supabase authentication tokens were being stored in plaintext using `@react-native-async-storage/async-storage` on native platforms.
**Learning:** React Native developers often default to `AsyncStorage` for ease of use, even for sensitive tokens, failing to realize it offers no encryption on iOS/Android. Expo's `SecureStore` is required but not directly compatible with the web fallback needed by Supabase SDK.
**Prevention:** Always implement a custom storage adapter when using Supabase in Expo, conditionally using `expo-secure-store` for native builds and `AsyncStorage` for the web fallback.
