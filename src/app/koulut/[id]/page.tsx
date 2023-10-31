import SearchCourses from "@/components/SearchCourses";
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getSchool(schoolId: string) {
  return prisma.school.findUnique({ where: { id: schoolId } });
}

async function getCoursesBySchool(schoolId: string) {
  return prisma.course.findMany({where: { schoolId }})
  
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
  const coursesOfSchool = await getCoursesBySchool(params.id);
  const allReviews = await getAllReviews()

  console.log(coursesOfSchool)

  if (!school) {
    return (
      <div>
        <Link href="/koulut" className="text-blue-500 hover:underline">
          Takaisin
        </Link>
        <h1 className="text-2xl font-bold mt-4">Yksittäinen Koulu</h1>
        <p className="text-gray-700">Koulua ei löytynyt.</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Link href="/koulut" className="text-blue-500 hover:underline">
        Takaisin
      </Link>
      <br></br>
      <Link href={`/lisaa-kurssi/${school.id}`} className="text-blue-500 hover:underline">
        Eikö kurssiasi ole täällä? Lisää se!
      </Link>
      <h1 className="text-2xl mt-4">{school.name} Kurssit</h1>
      <SearchCourses initialCourses={coursesOfSchool} allReviews={allReviews}/>
    </div>
  );
}

