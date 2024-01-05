"use client"

import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import Notification from "./Notification";

type UpvoteReviewProps = {
    schoolId: string;
    reviewId: string;
    likeCourseReview: (schoolId: string, reviewId: string) => Promise<string | null>;
    sessionIsNull: boolean;
  }

export default function UpvoteButton({ schoolId, reviewId, likeCourseReview, sessionIsNull }: UpvoteReviewProps) {
  
  const [error, setError] = useState<string | null>(null);

  const handleUpvote = async () => {
    const errorMessage = await likeCourseReview(schoolId, reviewId);
    setError(errorMessage);
    setTimeout(() => {
      setError(null)
    }, 5000)
  };

  return (
    <div>
      {error && 
      <Notification type="error" message={error} />}
      <button
        className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center ${sessionIsNull ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        onClick={handleUpvote}
        disabled={sessionIsNull}
      >
        <span className="mr-2">Tykkää</span>
        <FaThumbsUp />
      </button>
    </div>
  )
}