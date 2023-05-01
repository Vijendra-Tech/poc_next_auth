'use client'

import "./globals.css";
import { Inter } from "next/font/google";
import {GithubIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GitHub Login",
  description: "Next Auth- Github Login",
};

export default function RootLayout({ children }) {
  const githubRepo=()=>{
    window.open("https://github.com/Vijendra-Tech/poc_code-mirror","_blank")
  }
  return (
    <html lang="en">
      <body className={inter.className}>
      <main className="flex flex-col justify-between items-center">
        <div className="z-10 items-center justify-between focus-within:font-mono text-sm lg:flex h-16 fixed w-full bg-white">
          <div className="pl-3">
            <a
              className="pointer-events-none flex place-items sm:pointer-events-auto"
              href="https://vijendrarana.blog"
              target="_blank"
              rel="noopener noreferrer"
            >
              By Vijendra Rana
            </a>
          </div>
          <div className="pr-3"><GithubIcon className="w-8 h-8 cursor-pointer" onClick={()=>githubRepo()}/></div>
        </div>
        {children}
        </main>
      </body>
    </html>
  );
}
