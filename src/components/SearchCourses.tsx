"use client"

import { useEffect, useState } from "react";
import Link from 'next/link';
import { Review } from "@prisma/client";
import { FaStar } from "react-icons/fa";
import notebookImage from '@/Assets/book.png'
import Image from 'next/image';

type CourseSearchProps = {
    //initialCourses: Course[]
    allReviews: Review[];
    schoolId: string,
    getKoulutusOhjelmat: (schoolId: string) => Promise<Koulutusohjelma[]>
    getSearchCourses: (orgId: string, schoolId: string) => Promise<Course[]>
};

const SearchCourses: React.FC<CourseSearchProps> = ({ getSearchCourses, allReviews,
  getKoulutusOhjelmat, schoolId }) => {
    const [sortBy, setSortBy] = useState(""); // State for sorting
    const [searchQuery, setSearchQuery] = useState(""); // State for search
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 20;
    const [courses, setCourses] = useState<Course[]>([]);
    const [ koulutusOhjelmat, setKoulutusOhjelmat ] = useState<Koulutusohjelma[]>([])
    const [ orgId, setOrgId ] = useState('')
  //tuni-org-1301000013
    const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
);

useEffect(() => {
  const fetchKoulutusOhjelmat = async () => { // Define the fetchKoulutusOhjelmat function
      try {
          const res = await getKoulutusOhjelmat(schoolId);
          setKoulutusOhjelmat(res);
          setOrgId(res[0].id)
      } catch (error) {
          console.error("Error fetching courses:", error);
      }
  };

  fetchKoulutusOhjelmat(); // Call the fetchKoulutusOhjelmat function
}, []);

const handlePress = async (orgId: string) => {
  try {
    const result = await getSearchCourses(orgId, schoolId);
    setCourses(result); // Set the courses data
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}

const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
    } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
    }
    return 0;
});

const indexOfLastCourse = currentPage * coursesPerPage;
const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  
    const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
                {/* Sidebar */}
                <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">Suodata</h2>
                    
                    <select
                    className="p-2 border border-gray-300 rounded text-black max-w-[12rem]"
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value)}
                  >
                    {koulutusOhjelmat.map(ohjelma => (
                      <option key={ohjelma.id} value={ohjelma.id} >
                        {ohjelma.name.fi}
                      </option>
                    ))}
                  </select>
                  <br></br>
                  <button
                  className="my-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handlePress(orgId)}>Hae kurssit</button>
                    <h2 className="text-lg font-semibold mb-2">Lajittele</h2>
                    <select
                        className="p-2 border border-gray-300 rounded text-black"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="">Ei mitään</option>
                        <option value="name-asc">Nimi (A-Z)</option>
                        <option value="name-desc">Nimi (Z-A)</option>
                    </select>
                    {currentPage == 1 && (
                      <input
                      type="text"
                      className="p-2 border text-black border-gray-300 rounded w-full mt-4"
                      placeholder="Hae kurssia..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                    )}
                </div>
            </div>
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4">
                    {filteredCourses.length > 0 ? (
                      currentCourses.map((course) => {
                        const reviewsOfCourse = allReviews.filter(r => r.courseSisuId === course.id);
                        const reviewCount = reviewsOfCourse.length;
                        const sum = reviewsOfCourse.reduce((acc, review) => acc + review.rating, 0);
                        const averageRating = reviewCount > 0 ? sum / reviewCount : 0;

                        return (
                            <div
                              key={course.id}
                              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex items-center"
                            >
                              <div className="mr-4">
                                <Link href={`/kurssit/${course.id}`}>
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
                                <Link href={`/kurssit/${course.id}`}>
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
                          );
                    })
                    ) : (
                      <div className="text-center">
                      <p className="text-2xl mb-2">Lisää rajaustekijöitä etsiäksesi kursseja</p>
                      </div>
                    )}
                </div>
                <div className="md:col-span-3">
        {filteredCourses.length > coursesPerPage ? (
          <ul className="flex flex-wrap justify-center mt-4">
            {Array(Math.ceil(filteredCourses.length / coursesPerPage))
              .fill(null)
              .map((_, index) => (
                <li key={index}>
                  <button
                    className={`${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    } font-semibold py-2 px-4 my-1 mx-1 rounded-l hover:bg-blue-600 focus:outline-none`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        ) : null}

            </div>

        </div>
        </div>
    );
}

export default SearchCourses;
