## 2025-06-18 - [Critical] Removed hardcoded Supabase credentials
**Vulnerability:** Hardcoded `supabaseUrl` and `supabaseAnonKey` found directly in `src/lib/supabase.ts`.
**Learning:** Expo apps frequently initialize external clients on app launch; storing these globally without environment variables directly exposes sensitive integration points.
**Prevention:** Always use `process.env.EXPO_PUBLIC_*` prefixes in Expo applications for environment variable injection, and define fallbacks (e.g. `|| ''`) to ensure type safety and prevent runtime crashes.
