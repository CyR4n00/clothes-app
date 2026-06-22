## 2024-06-22 - [CRITICAL] Prevent Hardcoded Credentials
**Vulnerability:** Supabase mock URL and Anon Key were hardcoded in `src/lib/supabase.ts`.
**Learning:** Hardcoding any secrets or tokens, even dummy ones, is an anti-pattern as they may unintentionally be committed or leak into production code.
**Prevention:** Use environment variables (e.g., `process.env.EXPO_PUBLIC_SUPABASE_URL`) with safe fallbacks (like `''`) to configure the Supabase client.
