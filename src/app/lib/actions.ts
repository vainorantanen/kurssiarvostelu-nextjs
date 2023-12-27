"use server"

import prisma from "@/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

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