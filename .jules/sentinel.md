## 2025-07-02 - Environment variables for Supabase keys
**Vulnerability:** Hardcoded credentials pattern discovered in `src/lib/supabase.ts` where placeholders were used for Supabase URL and Anon Key. While these were placeholders, this setup encourages developers to directly paste real secrets into the code instead of using environment variables.
**Learning:** React Native / Expo projects often use placeholder strings instead of setting up environment variables from the start, making it easy to accidentally leak secrets in version control when going to production.
**Prevention:** Replaced placeholders with `process.env.EXPO_PUBLIC_SUPABASE_URL || ''` and `process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ''` to enforce reading from the environment. Also created `.env.example` to document the necessary keys for new setups.

## 2025-02-27 - Added input length limits to TextInputs
**Vulnerability:** Text inputs were missing length limits, allowing users to input excessively large text arrays causing memory overhead or localized DoS (crashing the AsyncStorage state store limit).
**Learning:** React Native TextInputs do not enforce a length limit by default, which can cause excessive string allocations.
**Prevention:** Always add a reasonable `maxLength` attribute to `<TextInput>` components for bounded data collection.
