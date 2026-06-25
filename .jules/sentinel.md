## 2024-05-25 - [Fix hardcoded API key]
**Vulnerability:** Found hardcoded placeholder keys for Supabase URL and Anon Key in `src/lib/supabase.ts`.
**Learning:** In Expo React Native apps, Supabase initialization can fail or throw warnings if `createClient` is provided `undefined` when environment variables aren't set.
**Prevention:** Always use `process.env.EXPO_PUBLIC_... || ''` with an empty string fallback when retrieving keys to prevent exposure and avoid initialization crashes while ensuring proper environment variable configuration is documented via `.env.example`.