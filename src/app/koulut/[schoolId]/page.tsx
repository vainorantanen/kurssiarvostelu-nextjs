import { getKoulutusOhjelmat, getSchool, getSearchCoursesPages } from "@/app/lib/data";
import ChooseSearch from "@/app/ui/schools/courses/ChooseSearch";
import CoursesList from "@/app/ui/schools/courses/courseslist";
import Pagination from "@/app/ui/schools/pagination";
import SearchCourses from "@/components/SearchCourses";
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getAllReviews() {
  return prisma.review.findMany()
}



export default async function SingleschoolPage({ params,
  searchParams }: {params: any, searchParams?: {
    orgId?: string;
    page?: string;
  }}) {
  const school = await getSchool(params.schoolId)
  const allReviews = await getAllReviews()

  const orgId = searchParams?.orgId || 'tuni-org-1301000013';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getSearchCoursesPages(orgId, school.id);

    const koulutusohjelmat = await getKoulutusOhjelmat(params.schoolId)

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
      <h1 className="text-2xl mt-4 mb-4 text-center font-bold">{school.name.fi} Kurssit</h1>
      <div className="mt-2 mb-3">
      <button className="ml-1 mt-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href='/'>Takaisin</Link>
  </button>
  <p className="mt-4 ml-1">Eikö kurssiasi ole täällä? </p>
  <button className="ml-1 mt-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href={`/lisaa-kurssi/${school.id}`}>Ehdota kurssin lisäystä</Link>
  </button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="md:col-span-1">
  <div className="py-4">
    <ChooseSearch koulutusohjelmat={koulutusohjelmat}/>
    </div>
  </div>
  <div className="md:col-span-2">
  <div className="grid grid-cols-1 gap-4">
    <CoursesList orgId={orgId} universityOrgId={school.id} currentPage={currentPage}/>
    </div>
    </div>
  </div>
   <div className="mt-5 flex w-full justify-center">
      <Pagination totalPages={totalPages} />
   </div>
 </div>
  );
}

/**
 * <SearchCourses allReviews={allReviews}
      schoolId={school.id} getSearchCourses={getSearchCourses}
      getKoulutusOhjelmat={getKoulutusOhjelmat}
      />
 */
