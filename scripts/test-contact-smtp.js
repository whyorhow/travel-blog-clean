/**
 * Test Gmail SMTP credentials locally (same config as api/contact.js).
 *
 *   node --env-file=.env.local scripts/test-contact-smtp.js
 *
 * Or set GMAIL_APP_PASSWORD in the shell for a one-off run.
 */
import nodemailer from 'nodemailer';

const user = process.env.SMTP_USER || 'nomadscribbles20@gmail.com';
const pass = process.env.GMAIL_APP_PASSWORD?.trim();

if (!pass) {
  console.error('Missing GMAIL_APP_PASSWORD (use --env-file=.env.local or export it).');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass },
});

try {
  await transporter.verify();
  console.log('OK: Gmail SMTP auth succeeded for', user);
} catch (err) {
  console.error('FAIL:', err.code || err.responseCode, err.message);
  process.exit(1);
}
