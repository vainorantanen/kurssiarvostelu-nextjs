import prisma from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({ where: { email }})
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}