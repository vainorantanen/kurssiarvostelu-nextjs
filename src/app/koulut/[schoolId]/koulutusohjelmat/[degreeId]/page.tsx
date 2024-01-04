import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getDegree, getReviewsByDegree } from "@/app/lib/data";
import BackButton from "@/app/ui/schools/courses/BackButton";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function DegreePage({ params }: any) {
    const degree = await getDegree(params.degreeId);
    const reviewsOfDegree = await getReviewsByDegree(params.degreeId);
    const session = await getServerSession(authOptions)
    const sessionIsNull = session == null

    if (!degree) {
        return null
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-2/5 p-4">

            <BackButton />
  <h1 className="text-3xl font-bold my-4 text-white">Arvostelut koulutuksesta {degree.name.fi}, {degree.code}, ({degree.targetCredits.min} op)</h1>
  <div className="flex flex-row flex-wrap gap-2">
  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href={`/koulut/${params.schoolId}/koulutusohjelmat/${params.degreeId}/lisaa-arvostelu/`}>Arvostele tämä koulutusohjelma</Link>
  </button>
  </div>

            </div>
            <div className="w-full md:w-3/5 p-4">
                <h2 className="text-2xl font-bold text-white mt-5 mb-2 text-center">Arvostelut</h2>

            </div>
        </div>
    )
    
}