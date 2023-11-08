import SearchCourses from "@/components/SearchCourses";
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getSchool(schoolId: string) {
  return prisma.school.findUnique({ where: { id: schoolId } });
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

const getSearchCourses = async (orgId: string) => {
  "use server"

  //tuni-org-1301000013

  const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/course-unit-search?limit=1000&orgId=${orgId}&showMaxResults=false&start=0&uiLang=fi&universityOrgId=tuni-university-root-id&validity=ONGOING_AND_FUTURE`)
  const resultData = await res.json()
  return resultData.searchResults as Course[]
}

export default async function SingleschoolPage({ params }: any) {
  const school = await getSchool(params.id);
  const allReviews = await getAllReviews()
  //var visibleCoursesOfSchool = await getSearchCourses('tuni-org-1301000013')

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
      <SearchCourses allReviews={allReviews}
      schoolId={school.id} getSearchCourses={getSearchCourses}/>
    </div>
  );
}

