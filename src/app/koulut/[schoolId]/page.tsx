import { getKoulutusOhjelmat, getReviewData, getSchool, getSearchCoursesPages, getTiedekunnat } from "@/app/lib/data";
import ChooseDegreeProgrammeSearch from "@/app/ui/schools/courses/ChooseDegreeProgammeSearch";
import ChooseSearch from "@/app/ui/schools/courses/ChooseSearch";
import TextSearch from "@/app/ui/schools/courses/TextSearch";
import CoursesList from "@/app/ui/schools/courses/courseslist";
import Pagination from "@/app/ui/schools/pagination";
import Link from "next/link";

export default async function SingleschoolPage({ params,
  searchParams }: {params: any, searchParams?: {
    orgId?: string;
    page?: string;
    query?: string;
    facultyId?: string;
  }}) {
  const school = await getSchool(params.schoolId)

  const currentPage = Number(searchParams?.page) || 1;

  const koulutusohjelmat = await getKoulutusOhjelmat(params.schoolId)
  const tiedekunnat = await getTiedekunnat(params.schoolId)
  const orgId = searchParams?.orgId || 'none';
  const query = searchParams?.query || ''
  const orgRootId = searchParams?.facultyId || 'none'
  const totalPages = await getSearchCoursesPages(orgId, school.id, query, orgRootId);

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
      <h1 className="text-2xl mt-4 mb-4 text-center font-bold">Kohteen {school.name.fi} kurssien ja koulutusohjelmien arvostelut</h1>
      <div className="mt-2 mb-3">
      <button className="ml-1 mt-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href='/'>Etusivu</Link>
  </button>
  <p className="mt-4 ml-1">Eikö kurssiasi ole täällä? </p>
  <button className="ml-1 mt-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href={`/lisaa-kurssi/${school.id}`}>Ehdota kurssin lisäystä</Link>
  </button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="md:col-span-1">
  <div className="mb-2 py-2">
  <p className="mt-4 ml-1">Haetko koulutusohjelmien arvosteluita?</p>
  <button className="ml-1 mt-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href={`/koulut/${school.id}/koulutusohjelmat`}>{school.name.fi} koulutusohjelmat</Link>
  </button>
    </div>
  <div className="py-2 px-2 bg-white rounded shadow text-black">
    <h2 className="text-xl font-bold">Hae kursseja</h2>
    <ChooseSearch koulutusohjelmat={koulutusohjelmat} tiedekunnat={tiedekunnat}/>
    </div>
  </div>
  <div className="md:col-span-2">
  <div className="grid grid-cols-1 gap-4">
    <h1 className="text-2xl text-center font-bold">{koulutusohjelmat.find(k => k.id == orgId)?.name.fi}</h1>
    <TextSearch placeholder="Hae kurssia..."/>
    <CoursesList orgId={orgId} universityOrgId={school.id} currentPage={currentPage} query={query} orgRootId={orgRootId}/>
    {totalPages != null && totalPages > 1 && (
      <div className="mt-5 flex w-full justify-center text-center">
      <Pagination totalPages={totalPages} />
   </div>
    )}
    </div>
    </div>
  </div>
 </div>
  );
}
