## 2024-06-17 - [Secure Supabase Initialization]
**Vulnerability:** Hardcoded string placeholders for Supabase URL and Anon Key.
**Learning:** Developers can accidentally commit real secrets when testing if placeholders are used instead of environment variables.
**Prevention:** Always use process.env to read sensitive configurations and provide empty string fallbacks so the app fails fast if they are missing, while also preventing undefined runtime crashes. Provide a `.env.example` file to document required keys without exposing secrets.
