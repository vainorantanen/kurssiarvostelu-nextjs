import SearchCourses from "@/components/SearchCourses";
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getSchool(schoolId: string) {
  return prisma.school.findUnique({ where: { id: schoolId } });
}

async function getVisibleCoursesBySchool(schoolId: string) {
  return prisma.course.findMany({where: { schoolId, isVisible: true }}) 
}

async function getAllReviews() {
  return prisma.review.findMany()
}
/*
export async function deleteschool(id: string) {
    "use server"
  
    var success = false;

    try {
      await prisma.school.delete({ where: { id } });
      success = true
    } catch (error) {
      console.error("Error deleting school:", error);
    }

    if (success) {
        redirect('/poistettu-onnistuneesti')
    }
  }
*/

export default async function SingleschoolPage({ params }: any) {
  const school = await getSchool(params.id);
  const allReviews = await getAllReviews()

  const visibleCoursesOfSchool = await getVisibleCoursesBySchool(params.id);

  if (!school) {
    return (
      <div>
        <Link href="/" className="text-blue-500 hover:underline">
          Takaisin
        </Link>
        <h1 className="text-2xl font-bold mt-4">Yksittäinen Koulu</h1>
        <p className="text-gray-700">Koulua ei löytynyt.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl mt-4 mb-4 text-center font-bold">{school.name} Kurssit</h1>
      <div className="mt-2 mb-3">
      <button className="ml-1 mt-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href='/'>Takaisin</Link>
  </button>
  <p className="mt-4 ml-1">Eikö kurssiasi ole täällä? </p>
  <button className="ml-1 mt-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href={`/lisaa-kurssi/${school.id}`}>Lisää kurssi</Link>
  </button>
  </div>
      <SearchCourses initialCourses={visibleCoursesOfSchool} allReviews={allReviews}
      schoolId={school.id}/>
    </div>
  );
}

