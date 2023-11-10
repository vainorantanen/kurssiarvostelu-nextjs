import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import { AuthProvider } from "./Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Selaa ja anna yliopistokursseille arvosteluja anonyymisti. Katso, mitä mieltä muut ovat yliopistokursseista.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-800 text-slate-100 container mx-auto p-4 spacer layer1`}
      >
        <AuthProvider>
          <div>
            <Navbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}