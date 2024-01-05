import { getReviewData, getSearchCourses } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import notebookImage from '@/Assets/book.png'
import { FaStar } from "react-icons/fa";

export default async function CoursesList({
    orgId,
    universityOrgId,
    currentPage,
    query,
    orgRootId
  }: {
    orgId: string;
    universityOrgId: string;
    currentPage: number;
    query: string;
    orgRootId: string;
  }) { 

    const coursesResultData = await getSearchCourses(orgId, universityOrgId, currentPage, query, orgRootId)
    const courses = coursesResultData?.searchResults

    if (!courses || courses.length == 0) {
        return (
          <div className="bg-white rounded text-black py-4 text-center">
            <h2 className="font-bold text-xl">Lisää rajaustekijöitä</h2>
            <p className="py-2">Valitse tiedekunta ja/tai koulutusohjelma tai hae kurssia suoraan hakusanalla (vähintään 3 merkkiä)</p>
          </div>
        )
    }

    const courseIds = courses.map(c => c.id)
    const reviewData = await getReviewData(courseIds)

    return (
      <div>
        <p className="font-bold">{coursesResultData.total} hakutulosta</p>
        {courses.map(course => {
          const courseReviewData = reviewData.filter(d => d.courseSisuId === course.id)

          const reviewCount = courseReviewData.length

          // count the sum of ratings
          const sum = courseReviewData.reduce((acc, review) => acc + review.rating, 0);

          const averageRating = reviewCount > 0 ? sum / reviewCount : 0;

          return (
            <div
            key={course.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex items-center my-2"
          >
            <div className="mr-4">
                                <Link href={`/koulut/${universityOrgId}/kurssit/${course.id}?page=${currentPage}&orgId=${orgId}`}>
                                  <div className="relative w-16 h-16">
                                    <Image
                                      src={notebookImage}
                                      alt="Notebook"
                                      layout="fill"
                                      objectFit="cover"
                                      className="rounded-full"
                                    />
                                  </div>
                                </Link>
                              </div>
            <div>
              <Link href={`/koulut/${universityOrgId}/kurssit/${course.id}`}>
                <p className="text-lg font-semibold text-blue-500 hover:underline">
                  {course.name}, {course.code} ({course.credits.min === course.credits.max ? course.credits.min : `${course.credits.min} - ${course.credits.max}`}op)
                </p>
                <p className="text-black">{reviewCount} {reviewCount === 1 ? 'Arvostelu' : 'Arvostelua'}</p>
                 <div className="flex items-center text-black">
                  <p className="mr-2">{averageRating.toFixed(1)} tähteä</p>
                   {[...Array(Math.round(averageRating))].map((_, index) => (
                     <FaStar key={index} className="text-yellow-500" />
                      ))}
                  </div>
              </Link>
            </div>
          </div>
          )
        
       })}
       </div>
       )
       
  }