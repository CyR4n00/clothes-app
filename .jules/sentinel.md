## 2024-06-20 - Hardcoded Supabase Credentials
**Vulnerability:** Hardcoded Supabase URL and Anon Key in `src/lib/supabase.ts`.
**Learning:** Hardcoded credentials even placeholders like 'your-project' can lead to real credentials being committed by accident. The memory specifically notes: "When initializing the Supabase client, use empty strings ('') as fallback values for the URL and Anon Key environment variables instead of mock placeholder strings or dummy URLs. Also, standard `EXPO_PUBLIC_` prefix should be used for client side env variables."
**Prevention:** Use `process.env.EXPO_PUBLIC_SUPABASE_URL` and `process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY` with fallback to `''` as explicitly stated in guidelines.
