"use client"

import { useState } from "react";

type AddReviewProps = {
  id: string;
  addReview: (
    description: string,
    courseId: string,
    rating: number,
    grade: number
  ) => void;
};

export default function AddReviewForm({ id, addReview }: AddReviewProps) {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [grade, setGrade] = useState(0);

  const handleAddReview = () => {
    if (description.trim() !== "" && rating > 0 && grade >= 1 && grade <= 5) {
      addReview(description, id, rating, grade);
      setDescription("");
      setRating(0);
      setGrade(0);
    }
  };

  const handleStarClick = (star: number, setStar: (value: number) => void) => {
    setStar(star);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2">
        <textarea
          name="description"
          className="px-3 py-2 border rounded w-full md:w-96 h-48 shadow focus:outline-none text-black"
          placeholder="Kirjoita arvostelu tähän"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-2">
      <p>Anna kurssille arvosana (1-5 tähteä)</p>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            } text-2xl`}
            onClick={() => handleStarClick(star, setRating)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <div className="mb-2">
        <p>Minkä arvosanan sait kurssilta?</p>
        <div className="flex space-x-4">
          {/* Your additional questions go here */}
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="grade">Arvosana (1-5):</label>
        <input
          type="number"
          id="grade"
          name="grade"
          min="1"
          max="5"
          value={grade}
          onChange={(e) => setGrade(parseInt(e.target.value, 10))}
          style={{ color: 'black' }}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600"
        onClick={handleAddReview}
      >
        Lisää
      </button>
    </div>
  );
}
