//import DeleteCourseButton from "@/components/DeleteCourseButton";
import { getServerSession } from "next-auth"
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AddReviewForm from "@/components/AddReviewForm";

async function getCourse(courseId: string) {
  "use server"

  const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/course-units/v1/${courseId}`)
  const resultData = await res.json()
  return resultData as SingleCourse
}

async function addReview(description: string,
  rating: number, grade: number, year: string, workload: number,
  courseSisuId: string) {
  "use server"

  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.email) {
    throw new Error("Sinun tulee kirjautua sisään lisätäksesi arvostelu")
  }

  if (typeof description !== "string" || description.length === 0
  || !rating || typeof rating !== 'number' || !grade || typeof grade !== 'number'
  || !year || typeof year !== 'string' || !workload || typeof workload !== 'number'
  || !courseSisuId || typeof courseSisuId !== 'string' || courseSisuId.length === 0) {
      throw new Error("Invalid inputs")
    }

    // luodaan relaatio käyttäjän uniikin sähköpostin perusteella

    // kannattais tarkistaa viä että kurssi on olemassa?
  await prisma.review.create({ data: {
    description,
    rating,
    grade,
    year,
    workload,
    courseSisuId,
  user: {
    connect: {
      email: session.user.email
    }
  },
} })
  redirect('/kiitos-arvostelusta')
}

export default async function SingleCoursePage({ params }: any) {
  const course = await getCourse(params.id);

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
      <h1 className="text-2xl font-bold my-4">Arvostele {course.name.fi}</h1>
      <div>
        <AddReviewForm id={course.id} addReview={addReview}/>
      </div>
    </div>
  );
}
