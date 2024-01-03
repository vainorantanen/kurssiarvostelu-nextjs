"use client"

import { FaTrash } from "react-icons/fa";

type DeleteReviewProps = {
    id: string
    deleteReview: (id: string, schoolId: string) => Promise<void>;
    schoolId: string;
  }

export default function DeleteReviewButton({ id, deleteReview, schoolId }: DeleteReviewProps) {
  
  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center"
        onClick={() => deleteReview(id, schoolId)}
      >
        <span className="mr-2">Poista</span>
        <FaTrash />
      </button>
    </div>
  )
}