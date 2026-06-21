## 2026-06-21 - [CRITICAL] Prevent Hardcoded Secrets in Supabase Client
**Vulnerability:** Supabase URL and Anon Key were documented as hardcoded string placeholders (`'https://your-project.supabase.co'`, `'your-anon-key'`), encouraging developers to paste live credentials directly into the client code.
**Learning:** Developers often forget to remove these inline keys before committing, leading to exposed live credentials in version history.
**Prevention:** Always use environment variables (e.g. `process.env.EXPO_PUBLIC_...` or `import.meta.env...`) with empty string fallbacks (`|| ''`) and document required keys in a `.env.example` file to ensure secrets remain out of the repository codebase while still providing a clear configuration pattern.
