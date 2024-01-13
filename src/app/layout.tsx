import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import { AuthProvider } from "./Providers"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Femma.app: Avoin arvostelualusta korkeakoulujen kursseille ja koulutusohjelmille",
  description: "Lue arvosteluja. Kirjoita arvosteluja. Löydä parhaat kurssit sinun koulutusohjelmaasi."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="sX5JYKmHbJVXkbF53l1DtgaIdSPBN883kwkMnVWlg3w" />
      </head>
      <body
        className={`${inter.className} bg-slate-800 text-slate-100 container mx-auto p-4 spacer layer1`}
      >
        <AuthProvider>
          <div>
            <Navbar />
            {children}
          </div>
        </AuthProvider>
        <footer className="grid grid-cols-1 sm:grid-cols-3 my-5">
          <div className="sm:grid-cols-1 mb-3">
            <p className="font-bold">Yliopistojen kurssiarvostelut</p>
            <Link href={`/koulut/tuni-university-root-id`}>
            Tampereen yliopisto kurssiarvostelut
          </Link>
          <br></br>
          <Link href={`/koulut/aalto-university-root-id`}>
            Aalto-yliopisto kurssiarvostelut
          </Link>
          <br></br>
          <Link href={`/koulut/hy-university-root-id`}>
            Helsingin yliopisto kurssiarvostelut
          </Link>
          </div>
          <div className="sm:grid-cols-1 mb-3">
            <p  className="font-bold">Yliopistojen helpoimmat kurssit</p>
            <Link href={`/koulut/tuni-university-root-id`}>
            Tampereen yliopisto helpoimmat kurssit
          </Link>
          <br></br>
          <Link href={`/koulut/aalto-university-root-id`}>
            Aalto-yliopisto helpoimmat kurssit
          </Link>
          <br></br>
          <Link href={`/koulut/hy-university-root-id`}>
            Helsingin yliopisto helpoimmat kurssit
          </Link>
          </div>
          <div className="sm:grid-cols-1 mb-3">
            <p  className="font-bold">Yliopistojen koulutusohjelmien arvostelut</p>
            <Link href={`koulut/tuni-university-root-id/koulutusohjelmat`}>
            Tampereen yliopisto koulutusohjelmien arvostelut
          </Link>
          <br></br>
          <Link href={`koulut/aalto-university-root-id/koulutusohjelmat`}>
            Aalto-yliopisto koulutusohjelmien arvostelut
          </Link>
          <br></br>
          <Link href={`koulut/hy-university-root-id/koulutusohjelmat`}>
            Helsingin yliopisto koulutusohjelmien arvostelut
          </Link>
          </div>
        </footer>
      </body>
    </html>
  )
}