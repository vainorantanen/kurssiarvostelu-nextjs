//import DeleteCourseButton from "@/components/DeleteCourseButton";
import { getServerSession } from "next-auth"
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddReviewButton from "@/components/AddReviewButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

async function getCourse(courseId: string) {
  return prisma.course.findUnique({ where: { id: courseId } });
}

async function addReview(description: string, courseId: string) {
  "use server"

  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.email) {
    throw new Error("Sinun tulee kirjautua sisään lisätäksesi arvostelu")
  }

  if (typeof description !== "string" || description.length === 0 || 
  typeof courseId !== "string" || courseId.length === 0) {
      throw new Error("Invalid inputs")
    }

    // luodaan relaatio käyttäjän uniikin sähköpostin perusteella

    // kannattais tarkistaa viä että kurssi on olemassa?
  await prisma.review.create({ data: { description, 
  user: {
    connect: {
      email: session.user.email
    }
  },
  course: {
    connect: {
      id: courseId
    }
  }
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
    <div className="text-center">
      <Link href="/kurssit" className="text-blue-500 hover:underline">
        Takaisin
      </Link>
      <h1 className="text-2xl font-bold my-4">Arvostele kurssi</h1>
      <p>{course.name}</p>
      <div>
        <AddReviewButton id={course.id} addReview={addReview}/>
      </div>
    </div>
  );
}
