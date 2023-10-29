"use server"
import prisma from "@/db";

export async function getAllReviews() {
    const data = await prisma.review.findMany();
    return data;
}

export async function createReview(description: string) {
    const data = await prisma.review.create({ data: { description } })
    return data
}