import { getGmailAppPassword } from './_mailEnv.js';

/** GET /api/contact-status — verify mail env is wired on this Vercel deployment. */
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const mail = getGmailAppPassword();
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    mailConfigured: Boolean(mail),
    envKey: mail?.key ?? null,
    vercelEnv: process.env.VERCEL_ENV ?? null,
    hint: mail
      ? 'Gmail app password is visible to this deployment.'
      : 'Add GMAIL_APP_PASSWORD on THIS Vercel project (Production checked), then Redeploy.',
  });
}
