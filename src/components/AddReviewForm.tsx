"use client"

import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type AddReviewProps = {
  id: string;
  sessionIsNull: boolean;
  addReview: (
    description: string,
    rating: number,
    grade: number,
    year: string,
    workload: number,
    courseSisuId: string,
    expectations: number,
    materials: number,
    benefit: number,
  ) => void;
};

export default function AddReviewForm({ id, addReview, sessionIsNull }: AddReviewProps) {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [benefit, setBenefit] = useState(0);
  const [expectation, setExpectation] = useState(0);
  const [materials, setMaterials] = useState(0);
  const [grade, setGrade] = useState(5); // Initialize grade as an empty string
  const [year, setYear] = useState("1. vuonna"); // Initial year value
  const [ workload, setWorkload ] = useState(1)
  const [ captcha, setCaptcha ] = useState<string | null>()
  const [error, setError] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false); // New state for terms acceptance

  const handleTermsCheckbox = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  const handleAddReview = () => {

    if (!captcha && sessionIsNull) {
      setError("Todista, ettet ole robotti");
      return
    }
    // Check if grade is a number and between 1 and 5
    if (
      // joko sessio ei ole null eli käyttäjä on kirjautunut sisään => ei tarvii enää accept terms
      // tai sitten käyttöehdot on hyväksytty
      (!sessionIsNull || acceptedTerms) &&
      description.trim() !== "" &&
      rating > 0 &&
      !isNaN(Number(grade)) &&
      grade >= 1 &&
      grade <= 5
    ) {
      addReview(description, rating, Number(grade), year, workload, id, expectation, materials, benefit );
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
    <div className="p-4 max-w-xl mx-auto rounded shadow-lg bg-white">
      <textarea
        name="description"
        className="w-full h-40 px-3 py-2 border border-gray-300 rounded focus:outline-none text-black"
        placeholder="Kirjoita avoin arvostelu tähän"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

<div className="my-4 flex flex-col jusitfy-center items-center">
        <p className="text-black">Anna kurssille yleinen arvosana</p>
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

      <div className="my-4 flex flex-col jusitfy-center items-center">
        <p className="text-black">Kuinka hyvin kurssi vastasi odotuksiasi?</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-3xl ${
                star <= expectation ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleStarClick(star, setExpectation)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="my-4 flex flex-col jusitfy-center items-center">
        <p className="text-black">Kurssilla käytettyjen materiaalien (luentokalvot, kirjat tms.) laatu</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-3xl ${
                star <= materials ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleStarClick(star, setMaterials)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="my-4 flex flex-col jusitfy-center items-center">
        <p className="text-black">Kurssista on hyötyä muissa opinnoissa tai työelämässä</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-3xl ${
                star <= benefit ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleStarClick(star, setBenefit)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="my-4">
        <p className="text-black">Arvioi kurssin työmäärää suhteessa opintopisteisiin</p>
        <p className="text-black mb-1">(1 = vähän, 3 = sopiva, 5 = liikaa)</p>
        <input
          type="number"
          id="workload"
          name="workload"
          min="1"
          max="5"
          value={workload}
          onChange={(e) => setWorkload(Number(e.target.value))}
          className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none text-black"
        />
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
        <p className="text-black">Missä vaiheessa opintoja suoritit kurssin?</p>
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

      <div className="my-4 flex items-center">
  <p className="text-black">
    Onhan arvostelusi asiallinen? {sessionIsNull && (
      <>
        Hyväksyn palvelun{" "}
        <a href="/kayttoehdot" target="_blank" className="underline">
          käyttöehdot
        </a>
        :
      </>
    )}
  </p>
    <input
      type="checkbox"
      id="terms"
      name="terms"
      checked={acceptedTerms}
      onChange={handleTermsCheckbox}
      className="ml-2 h-4 w-4 border rounded-sm focus:ring-2 focus:ring-blue-500 text-blue-500"
    />
</div>
  {sessionIsNull && (
    <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} className="mx-auto"
    onChange={setCaptcha}
    />
  )}
      {/* Button to add review - enable only when terms are accepted */}
      <button
        className={`w-full bg-blue-500 text-white py-2 my-1 rounded hover:bg-blue-600 ${!acceptedTerms && "opacity-50 cursor-not-allowed"}`}
        onClick={handleAddReview}
        disabled={!acceptedTerms}
      >
        Lisää arvostelu
      </button>
      {error && (
            <div className="bg-red-500 my-2 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
    </div>
  );
}
