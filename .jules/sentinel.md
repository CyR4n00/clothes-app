## 2024-05-24 - Supabase Hardcoded Keys Prevention
**Vulnerability:** Hardcoded Supabase URL and Anon Key in `src/lib/supabase.ts`.
**Learning:** Client-side initialization should never use hardcoded sensitive values to avoid accidentally committing them into the repository.
**Prevention:** Use standard Expo environment variable pattern (`EXPO_PUBLIC_*`) coupled with fallback values (`''`) and maintain an `.env.example` file for secure developer onboarding.
