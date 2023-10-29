"use client"

import { useState } from "react";

type AddReviewProps = {
  id: string;
  addReview: (description: string, courseId: string) => void;
};

export default function AddReviewButton({ id, addReview }: AddReviewProps) {
  const [description, setDescription] = useState(""); // Corrected the variable name

  const handleAddReview = () => {
    // Check if description is not empty before adding the review
    if (description.trim() !== "") {
      addReview(description, id);
      setDescription(""); // Clear the textarea after adding the review
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <textarea
        name="description"
        className="px-3 py-2 border rounded w-64 shadow focus:outline-none text-black"
        placeholder="Kirjoita arvostelu tähän"
        rows={4}
        value={description} // Bind textarea value to the description state
        onChange={(e) => setDescription(e.target.value)} // Update description state on change
      />
      <button onClick={handleAddReview}>Lisää</button>
    </div>
  );
}
