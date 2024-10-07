// pages/api/contact.js

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, phone, message } = await req.json();

    const newContact = await prisma.contact.create({
      data: {
        fullName,
        email,
        phone,
        message,
      },
    });

    /*
    // Nodemailer setup using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,  // Use the app-specific password if 2FA is enabled
      },
    });

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Contact Form Submission Confirmation',
      text: `Thank you, ${fullName}, for reaching out to us. We have received your message and will get back to you shortly.`,
      html: `<p>Thank you, <strong>${fullName}</strong>, for reaching out to us. We have received your message and will get back to you shortly.</p>`,
    };

    await transporter.sendMail(mailOptions);

    */

    return NextResponse.json(
      { contact: newContact, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
