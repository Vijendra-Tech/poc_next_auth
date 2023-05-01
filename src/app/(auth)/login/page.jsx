"use client"
import { covertName } from "@/utils/util";
import Link from "next/link";
import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={covertName("", "absolute mt-20 left-4 md:top-8 md:left-8")}
      >
        Back
      </Link>
      <div className="flex  flex-col justify-center space-y-6">
        <div className="flex flex-col text-center w-full">
          <button
           type="button"
            className="bg-white border border-slate-200 hover:bg-white-100 dark:border-slate-700 dark:text-slate-100 p-10 rounded"
            onClick={() => {
              signIn();
            }}
          >
            Login With GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
