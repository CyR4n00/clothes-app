## 2024-07-25 - Floating Promises in Secure Storage Adapter
**Vulnerability:** Floating promises in `ExpoSecureStoreAdapter` `setItem` and `removeItem` methods.
**Learning:** Omitting the return statement in wrapper methods for asynchronous secure storage operations creates floating promises. This causes the client (like Supabase) to assume instantaneous success, ignoring potential keystore failures.
**Prevention:** Always explicitly return the generated Promises from wrapper methods for asynchronous operations.
