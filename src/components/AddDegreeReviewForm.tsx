"use client"

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Notification from "./Notification";
import { DeliveryMethod, GradingCriteria, UserGrade, UserYear, Workload, WriterEmploymentStatus } from "@/utils/types";
import Select, { ActionMeta, MultiValue } from 'react-select';

type AddReviewProps = {
  id: string;
  sessionIsNull: boolean;
  schoolId: string;
  addDegreeReview: (
    description: string,
    rating: number,
    workload: Workload,
    degreeId: string,
    expectations: number,
    benefit: number,
    schoolId: string,
    difficulty: number,
    completionYear: string,
    employment: number,
    coursesQuality: number,
    writerEmploymentStatus: WriterEmploymentStatus
  ) => void;
};

export default function AddDegreeReviewForm({ id, addDegreeReview, schoolId, sessionIsNull }: AddReviewProps) {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [benefit, setBenefit] = useState(0);
  const [expectation, setExpectation] = useState(0);
  const [coursesQuality, setCoursesQuality] = useState(0);
  const [completionYear, setCompletionYear] = useState<string>(""); // Initial year value
  const [ workload, setWorkload ] = useState<Workload>(Workload.Sopiva);
  const [ captcha, setCaptcha ] = useState<string | null>()
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false); // New state for terms acceptance
  const [ showNotification, setShowNotification ] = useState<boolean>(false)
  const [ difficulty, setDifficulty ] = useState(0)
  const [employment, setEmployment] = useState(0);
  const [ writerEmploymentStatus, setWriterEmploymentStatus] = useState<WriterEmploymentStatus>(WriterEmploymentStatus.Working);


  const handleTermsCheckbox = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  const handleAddReview = () => {
    
    if (!captcha && sessionIsNull) {
      setError("Todista, ettet ole robotti");
      return
    }

    if (!acceptedTerms) {
      setError("Sinun tulee hyväkysä käyttöehdot")
      return
    }

    if (
      // joko sessio ei ole null eli käyttäjä on kirjautunut sisään => ei tarvii enää accept terms
      // tai sitten käyttöehdot on hyväksytty
      (!sessionIsNull || acceptedTerms) &&
      description.trim() !== "" &&
      rating > 0
      && expectation > 0
      && benefit > 0
      && difficulty > 0
      && workload != null
      && completionYear != null
      && writerEmploymentStatus != null
      && coursesQuality > 0
      && employment > 0
    ) {
      addDegreeReview(
        description,
        rating,
        workload,
        id,
        expectation,
        benefit,
        schoolId,
        difficulty,
        completionYear,
        employment,
        coursesQuality,
        writerEmploymentStatus
      );
      setDescription("");
      setRating(0);
      setExpectation(0)
      setBenefit(0) 
      notify()
    } else {
      setError("Tarkista syöttämäsi arvot")
      return
    }
  };

  const handleStarClick = (star: number, setStar: (value: number) => void) => {
    setStar(star);
  };

  const handleWorkloadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWorkload(e.target.value as Workload);
  };

  const handleWriterEmploymentStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWriterEmploymentStatus(e.target.value as WriterEmploymentStatus);
  };

  const notify = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 10000)
  }

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2015; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };
  
  // Inside your component
  const years = getYears();

  const handleCompletionYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompletionYear(e.target.value)
  }

  return (
    <div className="p-4 max-w-xl mx-auto rounded shadow-lg bg-white">
      <textarea
        name="description"
        className="w-full h-40 px-3 py-2 border border-gray-300 rounded focus:outline-none text-black"
        placeholder="Kirjoita avoin arvostelu tähän*"
        value={description}
        required
        onChange={(e) => setDescription(e.target.value)}
      />

<div className="my-4 flex flex-col jusitfy-center items-center">
        <p className="text-black">Anna koulutusohjelmalle yleinen arvosana</p>
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
        <p className="text-black">Kuinka hyvin koulutusohjelma vastasi odotuksiasi?</p>
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
        <p className="text-black">Koulutusohjelmien kurssien laatu</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-3xl ${
                star <= coursesQuality ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleStarClick(star, setCoursesQuality)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="my-4 flex flex-col jusitfy-center items-center">
        <p className="text-black">Helppous (1 = Todella vaikea, 5 = Todella helppo)</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-3xl ${
                star <= difficulty ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleStarClick(star, setDifficulty)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="my-4 flex flex-col jusitfy-center items-center">
        <p className="text-black">Koulutusohjelman hyödyllisyys</p>
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

      <div className="my-4 flex flex-col jusitfy-center items-center">
        <p className="text-black">Työllistyminen</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-3xl ${
                star <= employment ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleStarClick(star, setEmployment)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="my-4">
        <p className="text-black">Työmäärä suhteessa opintopisteisiin</p>
        <select
        id="workload"
        name="workload"
        value={workload}
        onChange={handleWorkloadChange}
        className="w-32 px-2 py-1 border border-gray-300 rounded focus:outline-none text-black"
      >
        {Object.values(Workload).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      </div>

      <div className="my-4">
        <p className="text-black">Työllisyystilanteesi valmistuessa</p>
        <select
        id="writerEmploymentStatus"
        name="writerEmploymentStatus"
        value={writerEmploymentStatus}
        onChange={handleWriterEmploymentStatusChange}
        className="w-32 px-2 py-1 border border-gray-300 rounded focus:outline-none text-black"
      >
        {Object.values(WriterEmploymentStatus).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      </div>

      <div className="my-4">
  <p className="text-black">Minä vuonna valmistuit koulutusohjelmasta?</p>
  <select
    value={completionYear}
    onChange={handleCompletionYearChange}
    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none text-black"
  >
    <option value="">Valitse vuosi</option>
    <option value="En halua kertoa">En halua kertoa</option>
    {years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
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


      {showNotification && (
          <Notification message="Arvostelu lisätty onnistuneesti" type="success" />
      )}

    </div>
  );
}
