"use client"

import { useState } from "react";

type AddReviewProps = {
  id: string;
  addReview: (
    description: string,
    courseId: string,
    rating: number,
    grade: number,
    year: string
  ) => void;
};

export default function AddReviewForm({ id, addReview }: AddReviewProps) {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [grade, setGrade] = useState(5); // Initialize grade as an empty string
  const [year, setYear] = useState("1. vuonna"); // Initial year value

  const handleAddReview = () => {
    // Check if grade is a number and between 1 and 5
    if (
      description.trim() !== "" &&
      rating > 0 &&
      !isNaN(Number(grade)) &&
      grade >= 1 &&
      grade <= 5
    ) {
      addReview(description, id, rating, Number(grade), year);
      setDescription("");
      setRating(0);
      setGrade(5); // Reset grade to an empty string
      setYear("1. vuonna"); // Reset year to the initial value
    }
  };

  const handleStarClick = (star: number, setStar: (value: number) => void) => {
    setStar(star);
  };

  return (
    <div className="p-4 max-w-md mx-auto rounded shadow-lg bg-white">
      <textarea
        name="description"
        className="w-full h-40 px-3 py-2 border border-gray-300 rounded focus:outline-none text-black"
        placeholder="Kirjoita arvostelu tähän"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

<div className="my-4 ">
        <p className="text-black">Anna kurssille arvosana (1-5 tähteä)</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-3xl ${
                star <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleStarClick(star, setRating)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="my-4">
        <p className="text-black">Minkä arvosanan sait kurssilta (1-5)?</p>
        <input
          type="number"
          id="grade"
          name="grade"
          min="1"
          max="5"
          value={grade}
          onChange={(e) => setGrade(Number(e.target.value))}
          className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none text-black"
        />
      </div>

      <div className="my-4">
        <p className="text-black">Milloin suoritit kurssin?</p>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none text-black"
        >
          <option value="1. vuonna">1. vuonna</option>
          <option value="2. vuonna">2. vuonna</option>
          <option value="3. vuonna">3. vuonna</option>
          <option value="4. vuonna">4. vuonna</option>
          <option value="5. vuonna">5. vuonna</option>
          <option value="6. vuonna">6. vuonna</option>
          <option value="N. vuonna">N. vuonna</option>
        </select>
      </div>

      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={handleAddReview}
      >
        Lisää arvostelu
      </button>
    </div>
  );
}
