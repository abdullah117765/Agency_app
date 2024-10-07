// pages/api/quote.js

import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, services, NoOfServices, comments } = await req.json();

    const newQuote = await prisma.quote.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        services: services,
        NoOfServices: NoOfServices,
        comments: comments,
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
      subject: 'Quote Request Confirmation',
      text: `Thank you, ${firstName} ${lastName}, for requesting a quote. We have received your request and will get back to you shortly.`,
      html: `<p>Thank you, <strong>${firstName} ${lastName}</strong>, for requesting a quote. We have received your request and will get back to you shortly.</p>`,
    };

    await transporter.sendMail(mailOptions);
*/
    return NextResponse.json(
      { quote: newQuote, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
