/** Shared Gmail app-password lookup (Vercel project env). */
export function getGmailAppPassword() {
  const keys = [
    'GMAIL_APP_PASSWORD',
    'GMAIL_APP_PASS',
    'GMAIL_PASSWORD',
    'EMAIL_APP_PASSWORD',
  ];
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return { value, key };
  }
  return null;
}
