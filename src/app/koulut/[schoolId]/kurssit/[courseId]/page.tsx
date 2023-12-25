//import DeleteCourseButton from "@/components/DeleteCourseButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import DeleteReviewButton from "@/components/DeleteReviewButton";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import { Review, User } from "@prisma/client";
import { formatDistanceToNow } from 'date-fns';
import dayjs from "dayjs";
import BackButton from "@/app/ui/schools/courses/BackButton";
import { deleteReview, getCourse, getReviewsByCourse, getUser } from "@/app/lib/data";


  export default async function SingleCoursePage({ params }: any) {
    const course = await getCourse(params.courseId);
    const reviewsOfCourse = await getReviewsByCourse(params.courseId);
    const session = await getServerSession(authOptions)

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

    var userFromDb: User | null = null;


    if (session && session.user && session.user.email) {
      userFromDb = await getUser(session.user.email)
    }
      // Calculate the average star rating
      const totalRating = reviewsOfCourse.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalRating / reviewsOfCourse.length;

      // Calculate grade statistics
        const gradeCounts: Record<string, number> = {
          '5': 0,
          '4': 0,
          '3': 0,
          '2': 0,          
          '1': 0,
          '0': 0,
        };

        reviewsOfCourse.forEach((review) => {
          gradeCounts[review.grade.toString()]++;
        });

        const yearCounts: Record<string, number> = {
          'N. vuonna': 0,
          '6. vuonna': 0,
          '5. vuonna': 0,
          '4. vuonna': 0,
          '3. vuonna': 0,
          '2. vuonna': 0,          
          '1. vuonna': 0,
        };

        reviewsOfCourse.forEach((review) => {
          if (review.year) {
            yearCounts[review.year.toString()]++
          }
         })

         //    <Link href={`/koulut/${course.universityOrgIds[0]}`}>Takaisin</Link>
        return (
          <div className="min-h-screen flex flex-col md:flex-row">
            {/* Summary and Chart on small screens (1/3 width) */}
            <div className="w-full md:w-2/5 p-4">
            <BackButton />
  <h1 className="text-3xl font-bold my-4 text-white">{course.name.fi || course.name.en}, {course.code}</h1>
  <p className="mb-2 text-xl">({course.credits.min === course.credits.max ? course.credits.min: `${course.credits.min} - ${course.credits.max}`}op)</p>
  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href={`/koulut/${params.schoolId}/kurssit/${params.courseId}/lisaa-arvostelu/`}>Arvostele tämä kurssi</Link>
  </button>
        
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
              <p className="mt-2 text-xl font-bold">Vastanneiden saamat arvosanat</p>
              <div className="mt-4">
  {Object.keys(gradeCounts).reverse().map((grade) => {
    const gradeCount = gradeCounts[grade];
    const maxGradeCount = Math.max(...Object.values(gradeCounts));
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
        <div className="w-1/4 pl-2 text-right">{gradeCount} kpl</div>
      </div>
    );
  })}
</div>

<p className="mt-2 text-xl font-bold">Kurssien suoritusajankohdat</p>
              <div className="mt-4">
  {Object.keys(yearCounts).reverse().map((year) => {
    const yearCount = yearCounts[year];
    const maxYearCount = Math.max(...Object.values(yearCounts));
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
        <div className="w-1/4 pl-2 text-right">{yearCount} kpl</div>
      </div>
    );
  })}
</div>

            </div>
        
            {/* Reviews on small screens (2/3 width) */}
            <div className="w-full md:w-3/5 p-4">
              <h2 className="text-2xl font-bold text-white mt-5 mb-2 text-center">Arvostelut</h2>
              <div className="grid grid-cols-1 gap-4">
                {/* Reviews */}
                { reviewsOfCourse.length > 0 ? (
                  reviewsOfCourse.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg
                    flex flex-wrap gap-3">
                      <div className={`flex flex-col text-black text-center font-bold`}>
                        <div className={`rounded p-2 ${(review.rating + review.expectations + review.benefit
                        + review.materials)/4 > 3 ? 'bg-green-500' : 'bg-yellow-500'}`}>
                        <p>Yhteensä</p>
                        <p className="text-xl">{(review.rating + review.expectations + review.benefit
                        + review.materials)/4}</p>
                        </div>
                        </div>
                        <div>
                         <p className="text-xs text-black mb-2">{dayjs(review.createdAt).format('DD.MM.YYYY')}</p>
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
        <p className="text-black">Kurssi vastasi odotuksia</p>
      </td>
      <td className="flex items-center">
        {[...Array(review.expectations)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td className="pr-4">
        <p className="text-black">Kurssin materiaalit</p>
      </td>
      <td className="flex items-center">
        {[...Array(review.materials)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td className="pr-4">
        <p className="text-black">Hyöty muissa opinnoissa tai työelämässä</p>
      </td>
      <td className="flex items-center">
        {[...Array(review.benefit)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td>
          <p className="text-black pr-4">Saatu arvosana </p>
      </td>
      <td>
        <p className="text-black">{review.grade}</p>
      </td>
    </tr>
    <tr>
      <td>
          <p className="text-black pr-4">Työmäärä (1-5) </p>
      </td>
      <td>
        <p className="text-black">{review.workload}</p>
      </td>
    </tr>
  </tbody>
</table>
                        </div>
                      {userFromDb && (userFromDb.email === process.env.ADMIN
                      || userFromDb.id === review.userId) && (
                        <DeleteReviewButton id={review.id} deleteReview={deleteReview}/>
                      )}
                    </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white mb-2 text-center">Ei vielä arvosteluja</p>
                ) }
              </div>
            </div>
            
          </div>
        )
}
