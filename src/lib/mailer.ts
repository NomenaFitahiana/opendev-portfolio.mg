import "dotenv/config";
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

type EmailParams = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
};

export async function sendEmail({ to, subject, text, html }: EmailParams) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: to,
      subject: `${subject}`,
      text: text,
      html: html,
    });
    return NextResponse.json({ message: 'Email sent' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
