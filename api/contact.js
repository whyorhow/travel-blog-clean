import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;



  // Gmail SMTP transporter using port 587 and TLS
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: 'nomadscribbles20@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Verify SMTP connection
  try {
    await transporter.verify();

  } catch (verifyError) {

    return res.status(500).json({ message: "SMTP verification failed" });
  }

  // Send email
  try {
    await transporter.sendMail({
      from: '"Nomad Scribbles" <contact@nomadscribbles.com>',
      to: 'nomadscribbles20@gmail.com',
      subject: `New message from ${name || "Anonymous"}`,
      text: message || "No message content provided.",
      replyTo: email || "nomadscribbles20@gmail.com",
    });


    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (sendError) {
    // Log removed
    res.status(500).json({ message: 'Error sending email' });
  }
}
