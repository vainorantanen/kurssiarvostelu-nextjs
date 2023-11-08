import prisma from "@/db";
import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

export async function POST(req: any) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } })
    // sähköpostin vahvistaminen

    if (!user) {
        throw new Error("Käyttäjää ei löytynyt")
    }

    const token = jwt.sign({ id: user.id }, process.env.NEXTAUTH_SECRET, { expiresIn: '1d' })
    const confirmLink = process.env.NODE_ENV === 'production' ? `https://kurssiarvostelu-nextjs.vercel.app/vahvista-sahkoposti/${user.id}/${token}` :
      `http://localhost:3000/vahvista-sahkoposti/${user.id}/${token}`

    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: true,
      auth: {
        user: process.env.SENDING_EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    var mailOptions = {
      from: process.env.SENDING_EMAIL,
      to: email,
      subject: 'Sähköpostin vahvistus linkki',
      text: confirmLink
    }

    // eslint-disable-next-line no-unused-vars
    try {
        transporter.sendMail(mailOptions)
        return NextResponse.json({ message: "Sähköposti lähtetty" }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Tapahtui virhe sähköpostin lähettämisessä 1" },
            { status: 500 }
          );
    }

  } catch (error) {
    return NextResponse.json(
        { message: "Tapahtui virhe sähköpostin lähettämisessä 2" },
        { status: 500 }
      );
  }
}