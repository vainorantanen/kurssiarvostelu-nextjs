"use client"

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Notification from "./Notification";
import { DeliveryMethod, GradingCriteria, UserGrade, UserYear, Workload } from "@/utils/types";
import Select, { ActionMeta, MultiValue } from 'react-select';

type AddReviewProps = {
  id: string;
  sessionIsNull: boolean;
  schoolId: string;
  addReview: (
    description: string,
    rating: number,
    grade: UserGrade,
    year: UserYear,
    workload: Workload,
    courseSisuId: string,
    expectations: number,
    materials: number,
    benefit: number,
    schoolId: string,
    difficulty: number,
    interest: number,
    tips: string,
    gradingCriteria: GradingCriteria[],
    deliveryMethod: DeliveryMethod,
    attentanceSemester: string
  ) => void;
};

export default function AddReviewForm({ id, addReview, schoolId, sessionIsNull }: AddReviewProps) {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [benefit, setBenefit] = useState(0);
  const [expectation, setExpectation] = useState(0);
  const [materials, setMaterials] = useState(0);
  const [grade, setGrade] = useState<UserGrade>(UserGrade.Five); // Initialize grade as an empty string
  const [year, setYear] = useState<UserYear>(UserYear.VUONNA_1); // Initial year value
  const [ workload, setWorkload ] = useState<Workload>(Workload.Sopiva);
  const [ captcha, setCaptcha ] = useState<string | null>()
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false); // New state for terms acceptance
  const [ showNotification, setShowNotification ] = useState<boolean>(false)
  const [ difficulty, setDifficulty ] = useState(0)
  const [ interest, setInterest ] = useState(0)
  const [ tips, setTips ] = useState<string>('')
  const [ gradingCriteria, setGradingCriteria ] = useState<GradingCriteria[]>([])
  const [ deliveryMethod, setDeliveryMethod ] = useState<DeliveryMethod>(DeliveryMethod.EiValintaa)
  const [ attendanceSemester, setAttendanceSemester ] = useState<string>("")

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
      && materials > 0
      && benefit > 0
      && difficulty > 0 && interest > 0 && gradingCriteria != null
      && deliveryMethod != null
      && year != null
      && grade != null
      && workload != null
      && attendanceSemester != ""
    ) {
      addReview(description, rating, grade, year, workload, id, expectation, materials, benefit,
      schoolId, difficulty, interest, tips, gradingCriteria,
      deliveryMethod, attendanceSemester );
      setDescription("");
      setRating(0);
      setExpectation(0)
      setMaterials(0)
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

  const handleUserGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGrade(e.target.value as UserGrade);
  };

  const handleUserYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value as UserYear);
  };

  const handleCriteriaChange = (newValue: MultiValue<{ value: GradingCriteria; label: GradingCriteria; }>,
    actionMeta: ActionMeta<{ value: GradingCriteria; label: GradingCriteria; }>) => {
    const listOfVals = newValue.map(n => n.value) as GradingCriteria[]
    setGradingCriteria(listOfVals)
  };

  const handleDeliveryMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeliveryMethod(e.target.value as DeliveryMethod);
  };

  const criteriaOptions = Object.values(GradingCriteria).map((value) => ({
    value,
    label: value,
  }));

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

  const handleAttendanceSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAttendanceSemester(e.target.value)
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

<textarea
        name="tips"
        className="w-full h-40 px-3 py-2 border border-gray-300 rounded focus:outline-none text-black"
        placeholder="Anna vinkkejä kurssiin (valinnainen)"
        value={tips}
        onChange={(e) => setTips(e.target.value)}
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
        <p className="text-black">Kurssilla käytettyjen materiaalien laatu</p>
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
        <p className="text-black">Kiinnostavuus</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-3xl ${
                star <= interest ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleStarClick(star, setInterest)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="my-4 flex flex-col jusitfy-center items-center">
        <p className="text-black">Kurssin hyödyllisyys</p>
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
        <p className="text-black">Minkä arvosanan sait kurssilta (1-5)?</p>
        <select
          id="grade"
          name="grade"
          value={grade}
          onChange={handleUserGradeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none text-black"
        >
          {Object.values(UserGrade).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
        </select>
      </div>

      <div className="my-4">
        <p className="text-black">Missä vaiheessa opintojasi suoritit kurssin?</p>
        <select
          value={year}
          onChange={handleUserYearChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none text-black"
        >
          {Object.values(UserYear).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
        </select>
      </div>

      <div className="my-4">
  <p className="text-black">Minä vuonna suoritit kurssin?</p>
  <select
    value={attendanceSemester}
    onChange={handleAttendanceSemesterChange}
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

      <div className="my-4">
        <p className="text-black">Opetusmuoto</p>
        <select
        id="deliverymethod"
        name="deliverymethod"
        value={deliveryMethod}
        onChange={handleDeliveryMethodChange}
        className="w-32 px-2 py-1 border border-gray-300 rounded focus:outline-none text-black"
      >
        {Object.values(DeliveryMethod).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      </div>

      <div className="my-4 text-black">
        <p className="text-black">Kurssin arvostelukriteerit</p>
        <Select
        placeholder="Valitse..."
        isMulti
        options={criteriaOptions}
        onChange={handleCriteriaChange}
      />
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
