"use client"

import { useState } from "react";

type AddCourseProps = {
  id: string;
  schoolName: string;
  addCourse: (
    name: string,
    schoolId: string,
    courseCode: string,
    minCredits: number,
    maxCredits: number,
    lang: string
  ) => void;
};

export default function AddCourseForm({ id, schoolName, addCourse }: AddCourseProps) {
  const [name, setName] = useState(""); // Corrected the variable name
  const [courseCode, setCourseCode] = useState("");
  const [minCredits, setMinCredits] = useState(0);
  const [maxCredits, setMaxCredits] = useState(0);
  const [lang, setLang] = useState("");

  const handleaddCourse = () => {
    // Check if name is not empty before adding the review
    if (name.trim() !== "") {
      addCourse(name, id, courseCode, minCredits, maxCredits, lang);
      // Clear the form fields after adding the course
      setName("");
      setCourseCode("");
      setMinCredits(0);
      setMaxCredits(0);
      setLang("");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-2">Lisää uusi kurssi</h1>
      <h2 className="text-xl font-semibold my-2 text-white-600">Koululle: {schoolName}</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          className="w-64 px-3 py-2 border rounded focus:outline-none text-black"
          placeholder="Kurssin nimi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="courseCode"
          className="w-64 px-3 py-2 border rounded focus:outline-none text-black"
          placeholder="Kurssikoodi"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <input
          type="text"
          name="lang"
          className="w-64 px-3 py-2 border rounded focus:outline-none text-black"
          placeholder="kieli (esim. fi)"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        />
        <p>Minimi opintopisteet</p>
        <input
          type="number"
          className="px-3 py-2 border rounded w-64 shadow focus:outline-none text-black"
          placeholder="Minimi opintopisteet"
          value={minCredits}
          onChange={(e) => setMinCredits(parseInt(e.target.value, 10))}
        />
        <p>Maksimi opintopisteet</p>
        <input
          type="number"
          className="px-3 py-2 border rounded w-64 shadow focus:outline-none text-black"
          placeholder="Maksimi opintopisteet"
          value={maxCredits}
          onChange={(e) => setMaxCredits(parseInt(e.target.value, 10))}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleaddCourse}
        >
          Lisää
        </button>
      </div>
    </div>
  );
}
