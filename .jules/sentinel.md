## 2024-05-18 - [CRITICAL] Fix hardcoded Supabase credentials
**Vulnerability:** The codebase had hardcoded dummy Supabase URL and anonymous key directly in `outfit-swiper/src/lib/supabase.ts` which could lead to committing sensitive data when a developer updates it to test or deploy their app.
**Learning:** Hardcoding credentials in source files, even placeholders, is a dangerous pattern because a developer might accidentally commit real credentials after filling them in to make the app work locally.
**Prevention:** Always use environment variables (`process.env.EXPO_PUBLIC_*`) for client-side configurations with an empty string or safe fallback, and document the required keys in a `.env.example` file.
