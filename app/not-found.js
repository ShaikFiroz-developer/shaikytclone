"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

function Custom404() {
  return (
    <div className="w-full text-2xl bg-black text-white font-bold font-mono flex justify-center   min-h-screen">
      <div className="min-h-full grid justify-center items-center">
        <div>
          <div className="w-full flex justify-center items-center">
            <Image src={"/404.gif"} width={200} height={300} alt="404" />
          </div>
          <p>The page you're looking for does not seem to exist.</p>
          <Link
            className="text-blue-900 text-decoration-line underline"
            href="/"
          >
            SYT home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Custom404;
