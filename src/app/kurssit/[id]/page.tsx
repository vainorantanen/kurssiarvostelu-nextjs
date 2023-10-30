//import DeleteCourseButton from "@/components/DeleteCourseButton";
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getCourse(courseId: string) {
  return prisma.course.findUnique({ where: { id: courseId } });
}

async function getReviewsByCourse(courseId: string) {
  return prisma.review.findMany({ where: { courseId } })
}

/*
export async function deleteCourse(id: string) {
    "use server"
  
    var success = false;

    try {
      await prisma.course.delete({ where: { id } });
      success = true
    } catch (error) {
      console.error("Error deleting course:", error);
    }

    if (success) {
        redirect('/poistettu-onnistuneesti')
    }
  }

  */
export default async function SingleCoursePage({ params }: any) {
  const course = await getCourse(params.id);

  const reviewsOfCourse = await getReviewsByCourse(params.id)


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
      <h1 className="text-2xl font-bold my-4">Yksittäinen Kurssi</h1>
      <p>{course.name}</p>
        <Link href={`/lisaa-arvostelu/${course.id}`} className="text-blue-500 hover:underline">
        Arvostele tämä kurssi
      </Link>
      <h2>Arvostelut</h2>
      <ul className="pl-4">
          {reviewsOfCourse.map((review) => (
            <li key={review.id} className="my-2">
              <Link href={`/arvostelut/${review.id}`}>
                <p>{review.description}</p>
              </Link>
            </li>
          ))}
        </ul>
    </div>
  );
}
