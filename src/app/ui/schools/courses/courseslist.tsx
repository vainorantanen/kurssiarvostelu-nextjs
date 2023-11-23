import { getSearchCourses } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import notebookImage from '@/Assets/book.png'

export default async function CoursesList({
    orgId,
    universityOrgId,
    currentPage,
  }: {
    orgId: string;
    universityOrgId: string;
    currentPage: number;
  }) { 

    const courses = await getSearchCourses(orgId, universityOrgId, currentPage)

    if (!courses) {
        return null
    }

    return (
        courses.map(course => (
            <div
            key={course.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex items-center"
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
              </Link>
            </div>
          </div>
        ))
    )
  }