import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/component/Footer";
import { Toaster } from "react-hot-toast";



export default function RootLayout({ children }) {
  return (
   
      <html lang="en">
        <head>
          <title>WrkrBnC - Hire Professionals</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          {children}
          <Toaster/>
        </body>
      </html>

  );
}
