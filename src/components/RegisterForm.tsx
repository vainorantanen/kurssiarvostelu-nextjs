"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [ captcha, setCaptcha ] = useState<string | null>()

  const router = useRouter();

  const handleTermsCheckbox = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !password || !verifyPassword || !acceptedTerms) {
      setError("Kaikki kentät ovat pakollisia.");
      return;
    }
    console.log(captcha)
    if (!captcha) {
      setError("Todista, ettet ole robotti");
      return;
    }
  
    if (password !== verifyPassword) {
      setError("Salasana ja vahvistus eivät täsmää.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();

        const sendMailRes = await fetch('/api/sendMail', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        })

        if (sendMailRes.ok) {
          router.push("/kiitos-rekisteroitymisesta");
        } else {
          console.log("Sending email failed.");
        }
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="bg-blue-500 shadow-lg p-5 rounded-lg text-black">
        <h1 className="text-xl font-bold my-4">Rekisteröidy</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nimi"
            className="bg-white text-black rounded-lg px-3 py-2"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Sähköposti"
            className="bg-white text-black rounded-lg px-3 py-2"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Salasana"
            className="bg-white text-black rounded-lg px-3 py-2"
          />
          <input
          onChange={(e) => setVerifyPassword(e.target.value)}
          type="password"
          placeholder="Vahvista salasana"
          className="bg-white text-black rounded-lg px-3 py-2"
        />
       <div className="my-4 flex">
        <p className="text-black">
          Hyväksyn palvelun{" "}
          <a href="/kayttoehdot" target='_blank' className="underline">
            käyttöehdot
          </a>
          :
        </p>
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={acceptedTerms}
          onChange={handleTermsCheckbox}
          className="ml-2 h-4 w-4 mt-1 border rounded-sm focus:ring-2 focus:ring-blue-500 text-blue-500"
        />
      </div>

      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} className="mx-auto"
      onChange={setCaptcha}
      />
          <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
            Rekisteröidy
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right text-black" href={"/login"}>
            Onko sinulla jo käyttäjä? <span className="underline">Kirjaudu</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

