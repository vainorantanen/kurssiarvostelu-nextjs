import Image from "next/image";
import booksPic from '@/Assets/books.png'
import geometryPic from '@/Assets/geometry.png'
import anonymPic from '@/Assets/anonym.png'
import feedBackPic from '@/Assets/feedback-6956072_1920.png'
import searchPic from '@/Assets/search-148820_1920.png'

import { FaCheck, FaCheckCircle, FaSearch, FaStar } from "react-icons/fa";
import { BsIncognito } from "react-icons/bs";
import { SiGoogleanalytics } from "react-icons/si";
import { HiSelector } from "react-icons/hi";
import { TbListNumbers } from "react-icons/tb";

export default function FrontPageInfo() {
    return (
        <div className="w-full my-5">
                {/*Femma tarjoaa alustan, jossa...*/}
                <h1 className="text-xl sm:text-4xl font-bold py-3 text-center my-6">Koe kurssiarvostelujen voima.</h1>
            <div className="flex flex-wrap gap-2 my-3 p-4 justify-around bg-white rounded-lg shadow-md text-black">
                <div className="relative">
                    <Image
                    width={400}
                    height={400}
                    src={feedBackPic}
                    alt="Kurssien arvostelu"
                    />
                </div>
                <div className="max-w-lg">
                    <h1 className='text-2xl font-bold mb-3'>Femma.app on alusta, jossa korkeakoulujen kursseja voi arvostella.</h1>
                    <ul>
                        <li className="flex">
                        <FaCheck className="h-5 w-5 text-green-500 mr-2" />
                            Femmassa on kaikkien Sisun yliopistojen kurssit ja koulutusohjelmat.
                        </li>
                        <li className="flex">
                            <FaStar className="h-5 w-5 text-green-500 mr-2"  />
                            Avointen arvostelujen avulla voit kertoa mitä mieltä olit kurssista tai koulutusohjelmasta kokonaisuutena.
                        </li>
                        <li className="flex">
                        <BsIncognito className="h-5 w-5 text-green-500 mr-1"  />
                            Arvostelut ovat täysin anonyymeja. Nimesi ei näy arvosteluissa muille käyttäjille.
                        </li>
                        <li className="flex">
                        <SiGoogleanalytics className="h-5 w-5 text-green-500 mr-2"  />
                            Tarkastele kurssien analytiikkaa. Saat selville esimerkiksi mitä arvosanoja muut ovat saaneet, kuinka työläitä kurssit ovat ja kuinka hyödyllisenä kurssi nähdään.
                        </li>
                    </ul>
                </div>
            </div>

            <h1 className="text-xl sm:text-4xl font-bold py-3 text-center my-6">Näin homma toimii</h1>

            <div className="flex flex-wrap gap-2 my-3 p-4 justify-around text-black">
            <div>
                <Image
                width={250}
                height={250}
                src={searchPic}
                alt="Hae kurssiarvosteluja"
                />
                </div>
            <div className="max-w-lg bg-white rounded-lg shadow-md p-3">
                <h1 className='text-2xl font-bold mb-3'>Etsi haluamasi kurssi tai koulutusohjelma</h1>
                <ul>
                    <li className="flex">
                        <HiSelector className="h-5 w-5 text-sky-500 mr-1"/>
                        <p>Valitse etusivun hakukentästä korkeakoulu, jonka kurssitarjontaa haluat tarkastella.
                        </p>
                    </li>
                    <li className="flex">
                        <FaSearch className="h-5 w-5 text-sky-500 mr-1"/>
                        <p>Voit hakea kursseja koulujen perusteella suoraan hakusanoilla tai suodattamalla hakutuloksia
                            haluamallasi tavalla.
                        </p>
                    </li>
                    <li className="flex">
                        <TbListNumbers className="h-5 w-5 text-sky-500 mr-1"/>
                        <p>Tarkastele lukuisia hakutuloksia!
                        </p>
                    </li>
                </ul>
          </div>
            </div>
        <br></br>
        <div className="flex items-center flex-wrap-reverse gap-4 justify-center">
          <div className="max-w-lg">
              <h1 className='text-2xl font-bold mb-3'>Lue kurssin arvosteluja ja lisää omasi</h1>
              <p>Tutustumalla kurssin saamiin arvosteluihin muilta opiskelijoilta ja alumneilta, 
                pystyt valitsemaan opintoihisi sopivimmat kurssit.
              </p>
          </div>
          <div className="relative w-60 h-60">
        <Image
        src={geometryPic}
        alt="Geometry"
        />
         </div>
        </div>
        <br></br>
        <div className="flex items-center flex-wrap gap-4 justify-center">
        <div className="relative w-60 h-60">
        <Image
        src={anonymPic}
        alt="Anonyymi"
        />
         </div>
          <div className="max-w-lg">
              <h1 className='text-2xl font-bold mb-3'>Anonyymit arvostelut</h1>
              <p>Arvostelut ovat täysin anonyymejä eli arvostelijan tiedot eivät ole muiden näkyvillä. 
                Voit siis huoletta antaa kurssien risut ja ruusut! 
              </p>
          </div>
        </div>
        <br></br>
        <div className="flex items-center flex-wrap-reverse gap-4 justify-center">
          <div className="max-w-lg">
              <h1 className='text-2xl font-bold mb-3'>Verifioitu opiskelija -merkki</h1>
              <p>Kirjautumalla sisään koulusi sähköpostilla ja vahvistamalla sen, saat verifioidun opiskelijan merkin arvosteluusi.
              Arvostelun voi jättää myös kirjautumatta sisään! 
              </p>
          </div>
          <div>
        <FaCheckCircle
          className="w-60 h-60"
        />
         </div>
        </div>
        </div>
    )
}