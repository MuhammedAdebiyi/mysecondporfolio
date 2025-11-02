import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer, { SentMessageInfo } from "nodemailer";

type ContactRequestBody = {
  name: string;
  email: string;
  message: string;
};

type ContactResponse = {
  message: string;
  info?: SentMessageInfo;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const body = req.body as ContactRequestBody;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info: SentMessageInfo = await transporter.sendMail({
      from: `"${body.name}" <${body.email}>`,
      to: process.env.EMAIL_TO,
      subject: `New message from ${body.name}`,
      text: body.message,
    });

    return res.status(200).json({ message: "Email sent successfully!", info });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send email." });
  }
}
