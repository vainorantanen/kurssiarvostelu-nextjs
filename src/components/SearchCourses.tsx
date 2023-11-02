"use client"

import { useState } from "react";
import Link from 'next/link';
import { Review } from "@prisma/client";
import { FaStar } from "react-icons/fa";
import notebookImage from '@/Assets/book.png'
import Image from 'next/image';


type Course = {
    id: string;
    name: string;
};
  
type CourseSearchProps = {
    initialCourses: Course[];
    allReviews: Review[];
};

const SearchCourses: React.FC<CourseSearchProps> = ({ initialCourses, allReviews }) => {
    const [sortBy, setSortBy] = useState(""); // State for sorting
    const [searchQuery, setSearchQuery] = useState(""); // State for search

    const filteredCourses = initialCourses.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedCourses = [...filteredCourses].sort((a, b) => {
        if (sortBy === "name-asc") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "name-desc") {
            return b.name.localeCompare(a.name);
        }
        return 0;
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
                {/* Sidebar */}
                <div className="p-4">
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
                    <input
                        type="text"
                        className="p-2 border text-black border-gray-300 rounded w-full mt-4"
                        placeholder="Hae kurssia..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4">
                    {sortedCourses.map((course) => {
                        const reviewsOfCourse = allReviews.filter(r => r.courseId === course.id);
                        const reviewCount = reviewsOfCourse.length;
                        const sum = reviewsOfCourse.reduce((acc, review) => acc + review.grade, 0);
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
                                    {course.name}
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
                    })}
                </div>
            </div>
        </div>
    );
}

export default SearchCourses;
