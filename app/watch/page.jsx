"use client";

import React from "react";
import Header1 from "@/components/head";
import "../globals.css";
import { useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import MobileComponent from "./mobilewatch/mbw";
import { useState, useEffect } from "react";
import DesktopComponent from "./desk/dsc";

function Page() {
  const [videoparas, setvideoparam] = useState("");
  useEffect(() => {
    const videoparam = useSearchParams();
    const vid = videoparam.get("q");
    setvideoparam(vid);
  }, []);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isDesktop ? (
        <DesktopComponent vid={videoparas} />
      ) : (
        <MobileComponent vid={videoparas} />
      )}
    </div>
  );
}

export default Page;
