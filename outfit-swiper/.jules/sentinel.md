## 2026-06-30 - Fix Hardcoded Supabase Credentials
**Vulnerability:** Supabase URL and Anon Key were hardcoded in `src/lib/supabase.ts`. Even if these were placeholder strings, hardcoding them is a bad practice and often leads to mistakenly committing real secrets to version control.
**Learning:** Hardcoded credentials are a critical vulnerability risk. Environment variables should always be used to supply secrets or configuration at build/run time.
**Prevention:** Use `process.env.EXPO_PUBLIC_SUPABASE_URL` and `process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY` and provide an `.env.example` file to document the expected configuration.
