import nodemailer from 'nodemailer';

const SMTP_USER = process.env.SMTP_USER || 'nomadscribbles20@gmail.com';
const SMTP_TO = process.env.CONTACT_TO || SMTP_USER;
const SMTP_FROM =
  process.env.CONTACT_FROM || '"Nomad Scribbles" <contact@nomadscribbles.com>';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const appPassword = process.env.GMAIL_APP_PASSWORD?.trim();
  if (!appPassword) {
    console.error('contact: GMAIL_APP_PASSWORD is not set on this deployment');
    return res.status(503).json({
      message: 'Contact form is temporarily unavailable. Please try again later.',
    });
  }

  const { name, email, message } = req.body ?? {};
  if (!email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: 'Email and message are required.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_USER,
      pass: appPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      subject: `New message from ${name?.trim() || 'Anonymous'}`,
      text: [
        `From: ${name?.trim() || 'Anonymous'}`,
        `Reply-To: ${email.trim()}`,
        '',
        message.trim(),
      ].join('\n'),
      replyTo: email.trim(),
    });

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    const code = err?.code || err?.responseCode;
    console.error(`contact: send failed (${code}):`, err?.message || err);
    return res.status(500).json({
      message: 'We could not send your message right now. Please try again later.',
    });
  }
}
