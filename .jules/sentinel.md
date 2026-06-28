## 2024-06-28 - Hardcoded Supabase Keys
**Vulnerability:** Supabase URL and Anon Key were hardcoded in `src/lib/supabase.ts`.
**Learning:** Hardcoding credentials in source files risks leaking them if the repository is made public or accessed by unauthorized users. Even though Expo anon keys are meant for the frontend, they should be managed via environment variables to allow switching between environments (dev/staging/prod) and to adhere to security best practices.
**Prevention:** Always use environment variables (`process.env.EXPO_PUBLIC_*` in Expo projects) for frontend configuration and secrets. Ensure `.env` is ignored in `.gitignore` and document required variables in a `.env.example` file.
