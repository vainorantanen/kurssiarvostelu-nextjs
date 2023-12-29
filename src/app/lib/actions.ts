"use server"

import prisma from "@/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"
import { getUser } from "./data"

const emailEndings = [
    "tuni.fi", "helsinki.fi", "jyu.fi", "aalto.fi", "hanken.fi", "student.lut.fi",
    "arcada.fi"
  ]
  
export async function addReview(description: string,
    rating: number, grade: number, year: string, workload: number,
    courseSisuId: string, expectations: number,
    materials: number,
    benefit: number, schoolId: string) {
  
    const session = await getServerSession(authOptions)
  
    if (typeof description !== "string" || description.length === 0
    || !rating || typeof rating !== 'number' || !grade || typeof grade !== 'number'
    || !year || typeof year !== 'string' || !workload || typeof workload !== 'number'
    || !courseSisuId || typeof courseSisuId !== 'string' || courseSisuId.length === 0
    || !expectations || typeof expectations !== 'number' || !materials
    || typeof materials !== 'number' || !benefit || typeof benefit !== 'number') {
        throw new Error("Invalid inputs")
      }
  
    if (session && session.user && session.user.email) {
      // käyttäjä on kirjautunut
      const userFromDb = await prisma.user.findUnique({ where: { email: session.user.email } })
      if (!userFromDb || (userFromDb && !userFromDb.isVerified)) {
        throw new Error("Käyttäjää ei löytynyt tietokannasta tai sen sähköposti on vahvistamatta")
      }
      await prisma.review.create({ data: {
        description,
        rating,
        grade,
        year,
        workload,
        courseSisuId,
        expectations,
        materials,
        benefit,
        writerIsVerified: userFromDb.isVerified && emailEndings.includes(userFromDb.email.split('@')[1]),
      user: {
        connect: {
          email: session.user.email
        }
      },
    } })
      //redirect('/kiitos-arvostelusta')

        revalidatePath(`/koulut/${schoolId}/kurssit/${courseSisuId}`)

    } else {
      // käyttäjä ei ole kirjautunut
      await prisma.review.create({ data: {
        description,
        rating,
        grade,
        year,
        workload,
        courseSisuId,
        expectations,
        materials,
        benefit,
        writerIsVerified: false
    } })
      //redirect('/kiitos-arvostelusta')
      revalidatePath(`/koulut/${schoolId}/kurssit/${courseSisuId}`)

    }
   
  }

export async function upvoteReview(schoolId:string, reviewId: string) {
    console.log('upvoted')

    const session = await getServerSession(authOptions)

    const rev = await prisma.review.findUnique({ where: {id: reviewId} })
    if (!rev) {
      throw new Error("Arvostelua ei löytynyt")
    }

    if (!session || !session.user || !session.user.email) {
      throw new Error("Sessionia ei ole")
    }

    const userFromDb = await getUser(session.user.email)

    if (!userFromDb) {
      throw new Error("Käyttäjää ei löytynyt")
    }

    // get posts liked by the user and check if the user has already liked the post
    const postsLikedByUser = await prisma.reviewLike.findMany({ where : { userId: userFromDb.id } })

    // try to find if the user has liked the current post
    const hasLiked = postsLikedByUser.find(p => p.reviewId == reviewId)

    if (hasLiked) {
      throw new Error("User has already liked this post")
    }

    try {
      await prisma.reviewLike.create({ data: {
        review: {
          connect: {
            id: reviewId
          }
        },
        user: {
          connect: {
            email: session.user.email
          }
      }
    }})

    const currentLikes = rev.likesCount;
    const updatedLikes = currentLikes + 1; // Increment the likes count

    // Update the review with the incremented likes count
    await prisma.review.update({
      where: { id: reviewId },
      data: { likesCount: updatedLikes },
    });

    } catch (error) {
      throw new Error("Error liking post")
    }

    revalidatePath(`/koulut/${schoolId}/kurssit/${reviewId}`)
}

export async function deleteReview(id: string) {
  
    const session = await getServerSession(authOptions)

    const rev = await prisma.review.findUnique({ where: {id} })
    if (!rev) {
      throw new Error("Arvostelua ei löytynyt")
    }

    if (!session || !session.user || !session.user.email) {
      throw new Error("Sessionia ei ole")
    }

    const userFromDb = await getUser(session.user.email)

    if (!userFromDb) {
      throw new Error("Käyttäjää ei löytynyt")
    }

    if (session.user.email !== process.env.ADMIN && userFromDb.id !== rev.userId) {
      throw new Error("Vain admin tai arvostelun lisännyt voi poistaa arvostelun")
    }

    await prisma.review.delete({ where: { id } });

    redirect('/poistettu-onnistuneesti')
  }