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

  
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !EMAIL_TO) {
    return res.status(500).json({ message: "SMTP environment variables not configured" });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    const info: SentMessageInfo = await transporter.sendMail({
      from: `"${body.name}" <${body.email}>`,
      to: EMAIL_TO,
      subject: `New message from ${body.name}`,
      text: body.message,
    });

    return res.status(200).json({ message: "Email sent successfully!", info });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Nodemailer error:", error.message);
    } else {
      console.error(error);
    }
    return res.status(500).json({ message: "Failed to send email." });
  }
}
