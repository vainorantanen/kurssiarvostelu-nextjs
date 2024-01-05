import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getDegree, getReviewsByDegree, getUser } from "@/app/lib/data";
import BackButton from "@/app/ui/schools/courses/BackButton";
import DeleteReviewButton from "@/components/DeleteReviewButton";
import UpvoteButton from "@/components/UpvoteButton";
import { User } from "@prisma/client";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaCheckCircle, FaStar, FaThumbsUp } from "react-icons/fa";

export default async function DegreePage({ params }: any) {
    const degree = await getDegree(params.degreeId);
    const reviewsOfDegree = await getReviewsByDegree(params.degreeId);
    const session = await getServerSession(authOptions)
    const sessionIsNull = session == null

    if (!degree) {
        return null
    }

    var userFromDb: User | null = null;


    if (session && session.user && session.user.email) {
      userFromDb = await getUser(session.user.email)
    }

          // Calculate the average star rating
          const totalRating = reviewsOfDegree.reduce((acc, review) => acc + review.rating, 0);
          const averageRating = totalRating / reviewsOfDegree.length;
    
          // Calculate grade statistics
            const coursesQualityCounts: Record<string, number> = {
              '5': 0,
              '4': 0,
              '3': 0,
              '2': 0,          
              '1': 0,
              '0': 0,
            };
    
            reviewsOfDegree.forEach((review) => {
              coursesQualityCounts[review.coursesQuality.toString()]++;
            });
    
            const employmentCounts: Record<string, number> = {
                '5': 0,
                '4': 0,
                '3': 0,
                '2': 0,          
                '1': 0,
                '0': 0,
            };
    
            reviewsOfDegree.forEach((review) => {
              if (review.employment) {
                employmentCounts[review.employment.toString()]++
              }
             })

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-2/5 p-4">

            <BackButton />
  <h1 className="text-3xl font-bold my-4 text-white">Arvostelut koulutuksesta {degree.name.fi}, {degree.code}</h1>
  <p className="text-xl mb-2">({degree.targetCredits.min} op)</p>
  <div className="flex flex-row flex-wrap gap-2">
  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href={`/koulut/${params.schoolId}/koulutusohjelmat/${params.degreeId}/lisaa-arvostelu/`}>Arvostele tämä koulutusohjelma</Link>
  </button>
  </div>

  <h2 className="text-2xl font-bold text-white mt-4 mb-2">Yhteenveto</h2>
              {averageRating > 0 ? (
                <p className="text-white">Keskiarvo {averageRating.toFixed(1)} tähteä</p>
              ) : (
                <p className="text-white">Ei vielä arvosteluja</p>
              )}
              {Math.round(averageRating) > 0 ? (
                <div className="flex items-center text-black">
                {[...Array(Math.round(averageRating))].map((_, index) => (
                  <FaStar key={index} className="text-yellow-500" />
                ))}
              </div>
              ) : (
                <div className="flex items-center text-black">
                {[...Array(Math.round(5))].map((_, index) => (
                  <FaStar key={index} className="text-gray-500" />
                ))}
              </div>
              )}
              <p className="mt-2 text-xl font-bold">Kurssien laatu</p>
              <div className="mt-4">
  {Object.keys(coursesQualityCounts).reverse().map((grade) => {
    const gradeCount = coursesQualityCounts[grade];
    const maxGradeCount = Math.max(...Object.values(coursesQualityCounts));
    const barWidth = maxGradeCount === 0 ? '0%' : `${(gradeCount / maxGradeCount) * 100}%`;
    
    return (
      <div key={grade} className="grade-bar flex items-center text-white mt-1">
        <div className="w-1/4 text-right pr-2">{grade} </div>
        <div className={`w-2/4 ${gradeCount > 0 ? 'bg-blue-200 rounded' : 'bg-gray-300 rounded'}`}>
          <div
            className="h-4"
            style={{ width: barWidth, backgroundColor: 'blue', borderRadius: '0.2rem' }}
          ></div>
        </div>
        <div className="w-1/4 pl-2 text-left">{gradeCount} kpl</div>
      </div>
    );
  })}
</div>

<p className="mt-2 text-xl font-bold">Työllistyminen</p>
              <div className="mt-4">
  {Object.keys(employmentCounts).reverse().map((year) => {
    const yearCount = employmentCounts[year];
    const maxYearCount = Math.max(...Object.values(employmentCounts));
    const barWidth = maxYearCount === 0 ? '0%' : `${(yearCount / maxYearCount) * 100}%`;
    return (
      <div key={year} className="grade-bar flex items-center text-white mt-1">
        <div className="w-1/4 text-right pr-2">{year} </div>
        <div className={`w-2/4 ${yearCount > 0 ? 'bg-blue-200 rounded' : 'bg-gray-300 rounded'}`}>
          <div
            className="h-4"
            style={{ width: barWidth, backgroundColor: 'blue', borderRadius: '0.2rem' }}
          ></div>
        </div>
        <div className="w-1/4 pl-2 text-left">{yearCount} kpl</div>
      </div>
    );
  })}
</div>

            </div>
            <div className="w-full md:w-3/5 p-4">
                <h2 className="text-2xl font-bold text-white mt-5 mb-2 text-center">Arvostelut</h2>

                <div className="grid grid-cols-1 gap-4">
                {/* Reviews */}
                { reviewsOfDegree.length > 0 ? (
                  reviewsOfDegree.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg
                    flex flex-wrap gap-3">
                      <div className={`flex flex-col text-black text-center font-bold`}>
                        <div className={`rounded p-2 ${(review.rating + review.expectations + review.benefit
                        + review.coursesQuality)/4 > 3 ? 'bg-green-500' : 'bg-yellow-500'}`}>
                        <p>Yhteensä</p>
                        <p className="text-xl">{(review.rating + review.expectations + review.benefit
                        + review.coursesQuality)/4}</p>
                        </div>
                        <div className="py-3 gap-2 flex items-center">
                          <FaThumbsUp />
                          <p>{review.likesCount}</p>
                          </div>
                        </div>
                        <div>
                         <p className="text-xs text-black mb-2">{dayjs(review.createdAt).format('DD.MM.YYYY')}, Suoritettu: {review.completionYear}</p>
                        {review.writerIsVerified && (
                        <div className="mb-2 flex items-center">
                          <FaCheckCircle className="text-blue-500 mr-2" />
                          <p className="text-black">Verifioitu opiskelija</p>
                        </div>
                      )}
                        <p className="text-black mb-2 whitespace-break-spaces">{review.description}</p>
    
                      <div>
                      <table className="table-auto mb-2">
  <tbody>
    <tr>
      <td className="pr-4">
        <p className="text-black">Yleisarvosana</p>
      </td>
      <td className="flex items-center">
        {[...Array(review.rating)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td className="pr-4">
        <p className="text-black">Koulutusohjelma vastasi odotuksia</p>
      </td>
      <td className="flex items-center">
        {[...Array(review.expectations)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td className="pr-4">
        <p className="text-black">Kurssien laatu</p>
      </td>
      <td className="flex items-center">
        {[...Array(review.coursesQuality)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td className="pr-4">
        <p className="text-black">Hyöty</p>
      </td>
      <td className="flex items-center">
        {[...Array(review.benefit)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td>
          <p className="text-black pr-4">Helppous</p>
      </td>
      <td className="flex items-center">
        {[...Array(review.difficulty)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td>
          <p className="text-black pr-4">Työllistyminen</p>
      </td>
      <td className="flex items-center">
        {[...Array(review.employment)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td>
          <p className="text-black pr-4">Työmäärä</p>
      </td>
      <td>
        <p className="text-black">{review.workload}</p>
      </td>
    </tr>
  </tbody>
</table>
                        </div>
                      
                    </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded shadow text-black p-2">
                    <p className="text-center">Ei vielä arvosteluja, lisää sinä ensimmäinen!</p>
                  </div>
                ) }
              </div>

            </div>
        </div>
    )
    
}