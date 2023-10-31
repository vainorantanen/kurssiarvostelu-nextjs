"use client"

import { useState } from "react";
import Link from 'next/link';
import { Review } from "@prisma/client";

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

                        return (
                            <div
                                key={course.id}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
                            >
                                <Link href={`/kurssit/${course.id}`}>
                                    <p className="text-lg font-semibold text-blue-500 hover:underline">
                                        {course.name}
                                    </p>
                                    <p className="text-black">{reviewCount} {reviewCount === 1 ? 'Arvostelu' : 'Arvostelua'}</p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SearchCourses;
