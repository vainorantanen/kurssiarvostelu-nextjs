"use client"

import { useState } from "react";

type AddCourseProps = {
  id: string
  schoolName: string
  addCourse: (name: string, schoolId: string, courseCode: string) => void;
};

export default function AddCourseForm({ id, schoolName, addCourse }: AddCourseProps) {
  const [name, setName] = useState(""); // Corrected the variable name
  const [courseCode, setCourseCode] = useState("");

  const handleaddCourse = () => {
    // Check if name is not empty before adding the review
    if (name.trim() !== "") {
      addCourse(name, id, courseCode);
      setName(""); // Clear the textarea after adding the review
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center space-x-2">
        <h1 className="text-4xl font-bold">Lisää uusi kurssi</h1>
        <h2>Koululle: {schoolName}</h2>
        <div className="flex flex-col items-center space-y-2">
        <textarea
          name="name"
          className="px-3 py-2 border rounded w-64 shadow focus:outline-none text-black"
          placeholder="Kurssin nimi"
          rows={4}
          value={name} // Bind textarea value to the name state
          onChange={(e) => setName(e.target.value)} // Update name state on change
        />
        <textarea
          name="courseCode"
          className="px-3 py-2 border rounded w-64 shadow focus:outline-none text-black"
          placeholder="Kurssikoodi"
          rows={4}
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)} 
        />
        <button onClick={handleaddCourse}>Lisää</button>
      </div>
    </div>
  );
}
