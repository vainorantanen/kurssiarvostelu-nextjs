//import DeleteCourseButton from "@/components/DeleteCourseButton";
import { getServerSession } from "next-auth"
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AddReviewForm from "@/components/AddReviewForm";

const emailEndings = [
  "tuni.fi", "helsinki.fi", "jyu.fi", "aalto.fi", "hanken.fi", "student.lut.fi",
  "arcada.fi"
]

async function getCourse(courseId: string) {
  "use server"

  const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/course-units/v1/${courseId}`)
  const resultData = await res.json()
  return resultData as SingleCourse
}

async function addReview(description: string,
  rating: number, grade: number, year: string, workload: number,
  courseSisuId: string, expectations: number,
  materials: number,
  benefit: number,) {
  "use server"

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
    redirect('/kiitos-arvostelusta')
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
    redirect('/kiitos-arvostelusta')
  }
 
}

export default async function SingleCoursePage({ params }: any) {
  const course = await getCourse(params.id);

  const session = await getServerSession(authOptions)
  const sessionIsNull = session == null

  if (!course) {
    return (
      <div>
        <Link href="/kurssit" className="text-blue-500 hover:underline">
          Takaisin
        </Link>
        <h1 className="text-2xl font-bold mt-4">Yksittäinen Kurssi</h1>
        <p className="text-gray-700">Kurssia ei löytynyt.</p>
      </div>
    );
  }

  return (
    <div className="text-center mt-3 min-h-screen">
      <Link href={`/kurssit/${course.id}`} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
        Takaisin
      </Link>
      <h1 className="text-2xl font-bold my-4">Arvostele {course.name.fi}, {course.code} ({course.credits.min === course.credits.max ? course.credits.min: `${course.credits.min} - ${course.credits.max}`}op)</h1>
      {sessionIsNull && (
      <div className="p-4 max-w-xl mx-auto rounded shadow-lg bg-white text-black my-3">
        <h2 className="text-lg font-semibold mb-2">Huomasimme, että et ole kirjautuneena sisään.</h2>
        <p className="text-sm">Voit jättää arvostelun kirjautumattakin, mutta luodessasi profiilin koulusi sähköpostilla 
          arvosteluihisi lisätään verifioidun opiskelijan merkki.
        </p>
        <p className="text-sm">Kirjautumalla sisään pystyt myös halutessasi poistamaan omia arviointejasi.</p>
        <div className="flex flex-col gap-2">
        <Link href='/login' className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
        Kirjaudu
      </Link>
        <Link href='/register' className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
        Rekisteröidy
      </Link>
          </div>
      </div>
    )}
      <div>
        <AddReviewForm id={course.id} addReview={addReview} sessionIsNull={sessionIsNull} />
      </div>
    </div>
  );
}
