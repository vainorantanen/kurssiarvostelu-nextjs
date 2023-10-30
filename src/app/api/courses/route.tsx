import prisma from "@/db";
import { NextResponse } from "next/server";

export async function getCourses() {
    const allCourses = await prisma.course.findMany()
    return NextResponse.json(allCourses)
}