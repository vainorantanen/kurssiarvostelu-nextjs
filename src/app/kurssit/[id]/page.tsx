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
    const reviewsOfCourse = await getReviewsByCourse(params.id);
  
    if (!course) {
      return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
          <Link href="/kurssit" className="text-blue-500 hover:underline">
            Takaisin
          </Link>
          <h1 className="text-3xl font-bold mt-4 text-gray-700">Kurssia ei löytynyt.</h1>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-4">
          <Link href="/kurssit" className="text-blue-500 hover:underline">
            Takaisin
          </Link>
          <h1 className="text-3xl font-bold my-4 text-white">{course.name}</h1>
          <Link href={`/lisaa-arvostelu/${course.id}`} className="text-blue-500 hover:underline">
            Arvostele tämä kurssi
          </Link>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 mt-4 text-white">
            <h2 className="text-2xl font-bold text-white">Arvostelut</h2>
            <div className="grid grid-cols-1 gap-4">
              {reviewsOfCourse.map((review) => (
                <div key={review.id} className="bg-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg">
                  <Link href={`/arvostelut/${review.id}`} className="text-blue-500 hover:underline">
                    <p className="text-black">{review.description}</p>
                  </Link>
                </div>
              ))}
            </div>
            </div>
            <div className="w-full md:w-1/2 mt-4 bg-gray-100 p-4">
              <h2 className="text-xl font-semibold text-black">Summary</h2>
              <p className="text-gray-600">
                This is a summary of the course. You can add important information here.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
