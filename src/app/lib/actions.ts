"use server"

import prisma from "@/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"
import { getUser } from "./data"
import { DeliveryMethod, GradingCriteria, UserGrade, UserYear, Workload } from "@/utils/types"

const emailEndings = [
    "tuni.fi", "helsinki.fi", "jyu.fi", "aalto.fi", "hanken.fi", "student.lut.fi",
    "arcada.fi"
  ]
  
export async function addReview(description: string,
    rating: number, grade: UserGrade, year: UserYear, workload: Workload,
    courseSisuId: string, expectations: number,
    materials: number,
    benefit: number, schoolId: string,
    difficulty: number, interest: number,
    tips: string, gradingCriteria: GradingCriteria[],
    deliveryMethod: DeliveryMethod,
    attendanceSemester: string) {
  
  try {
    const session = await getServerSession(authOptions)
  
    if (typeof description !== "string" || description.length === 0
    || !rating || typeof rating !== 'number' || !grade
    || !year || !workload || !gradingCriteria || !deliveryMethod
    || !courseSisuId || typeof courseSisuId !== 'string' || courseSisuId.length === 0
    || !expectations || typeof expectations !== 'number' || !materials
    || typeof materials !== 'number' || !benefit || typeof benefit !== 'number'
    || !interest || typeof interest !== 'number'
    || !difficulty || typeof difficulty !== 'number'
    || !attendanceSemester || typeof attendanceSemester != 'string') {
        throw new Error("Tarkista syötteesi")
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
        difficulty,
        interest,
        tips,
        gradingCriteria,
        deliveryMethod,
        attendanceSemester,
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
        difficulty,
        interest,
        tips,
        gradingCriteria,
        deliveryMethod,
        attendanceSemester,
        writerIsVerified: false
    } })
      //redirect('/kiitos-arvostelusta')
      revalidatePath(`/koulut/${schoolId}/kurssit/${courseSisuId}`)

    }
  } catch(error) {
    return (<Error>error).message;
  }   
  }

  export async function likeCourseReview(schoolId: string, reviewId: string) {
    try {
      const session = await getServerSession(authOptions);
      const rev = await prisma.review.findUnique({ where: { id: reviewId } });
  
      if (!rev) {
        throw new Error("Virhe: Arvostelua ei enää ole");
      }
  
      if (!session || !session.user || !session.user.email) {
        throw new Error("Virhe: Kirjaudu sisään tykätäksesi");
      }
  
      const userFromDb = await getUser(session.user.email);
  
      if (!userFromDb) {
        throw new Error("Virhe: Käyttäjää ei ole");
      }

      const userCurrentLikedRevs: string[] = userFromDb.likedCourseReviews

      if (userCurrentLikedRevs.includes(reviewId)) {
        throw new Error("Virhe: Olet jo tykännyt tästä");
      }

      const newList = userCurrentLikedRevs.concat(reviewId)

      await prisma.user.update({ where: { id: userFromDb.id }, data: {
        likedCourseReviews: newList
      } })

      const currentLikes = rev.likesCount;
      const updatedLikes = currentLikes + 1;
  
      await prisma.review.update({
        where: { id: reviewId },
        data: { likesCount: updatedLikes },
      });

      revalidatePath(`/koulut/${schoolId}/kurssit/${reviewId}`);
      return null; // No error occurred
    } catch (error) {
      return (<Error>error).message;
    }
  }

  /*
  export async function upvoteReview(schoolId: string, reviewId: string) {
    try {
      const session = await getServerSession(authOptions);
      const rev = await prisma.review.findUnique({ where: { id: reviewId } });
  
      if (!rev) {
        throw new Error("Virhe: Arvostelua ei enää ole");
      }
  
      if (!session || !session.user || !session.user.email) {
        throw new Error("Virhe: Kirjaudu sisään tykätäksesi");
      }
  
      const userFromDb = await getUser(session.user.email);
  
      if (!userFromDb) {
        throw new Error("Virhe: Käyttäjää ei ole");
      }
  
      const postsLikedByUser = await prisma.reviewLike.findMany({ where: { userId: userFromDb.id } });
      const hasLiked = postsLikedByUser.find((p) => p.reviewId == reviewId);
  
      if (hasLiked) {
        throw new Error("Virhe: Olet jo tykännyt tästä");
      }
  
      await prisma.reviewLike.create({
        data: {
          review: {
            connect: { id: reviewId },
          },
          user: {
            connect: { email: session.user.email },
          },
        },
      });
  
      const currentLikes = rev.likesCount;
      const updatedLikes = currentLikes + 1;
  
      await prisma.review.update({
        where: { id: reviewId },
        data: { likesCount: updatedLikes },
      });
  
      revalidatePath(`/koulut/${schoolId}/kurssit/${reviewId}`);
      return null; // No error occurred
    } catch (error) {
      return (<Error>error).message;
    }
  }
  */
  

export async function deleteReview(id: string, schoolId:string) {
  
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

    revalidatePath(`/koulut/${schoolId}/kurssit/${id}`)
  }