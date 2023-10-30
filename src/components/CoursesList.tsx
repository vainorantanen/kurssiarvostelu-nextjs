/*
"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

type allCoursesReturn = {
  id: string;
  name: string;
  schoolId: string | null;
}

export default function CoursesList() {

  const [data, setData] = useState<allCoursesReturn[]>([])
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/courses', { cache: 'force-cache' })
      .then((res) => res.json())
      .then((data) => {
        console.log('fetching')
        console.log('data', data)
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No course data</p>

  const courses = data

  return (
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">Kaikki kurssit</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Hae kursseja"
            className="px-3 py-2 border rounded w-64 shadow focus:outline-none text-black"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled // Add functionality here when needed
          >
            Etsi
          </button>
        </div>
        <Link
          href="/lisaa-kurssi"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          Lisää kurssi
        </Link>
        <ul className="pl-4">
      {courses.map((course) => (
        <li key={course.id} className="my-2">
          <Link href={`/kurssit/${course.id}`}>
            <p>{course.name}</p>
          </Link>
        </li>
      ))}
    </ul>
    </div>
  );
}
*/