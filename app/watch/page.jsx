"use client";

import React, { useEffect, useState, Suspense } from "react";
import Header1 from "@/components/head";
import "../globals.css";
import { useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import MobileComponent from "./mobilewatch/mbw";
import DesktopComponent from "./desk/dsc";

function PageContent() {
  const searchParams = useSearchParams();
  const [videoparas, setVideoparam] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const vid = searchParams.get("q");
    setVideoparam(vid);
  }, [searchParams]);

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

function Page() {
  return (
    <Suspense fallback={<ClipLoader color="blue" />}>
      <PageContent />
    </Suspense>
  );
}

export default Page;
