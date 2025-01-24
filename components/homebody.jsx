"use client";
import React, { useState, useEffect, CSSProperties } from "react";
import Card from "@/app/utils/card";
import Header from "./header";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "@/app/auth";
import { useContext } from "react";

function Homepagebody() {
  const [data, setVideoData] = useState([]);
  const [dataloading, setdataloaded] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);
  const [authLoading, setAuthLoading] = useState(true); // Track authentication loading state

  // Simulate loading of authentication state
  useEffect(() => {
    // Simulate a delay to fetch authentication state
    const timer = setTimeout(() => setAuthLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const chipFilterTag = async (elename) => {
    setdataloaded(true);
    if (elename === "Comedy") {
      elename = "Brammanandam comedy";
    }
    if (elename === "Music") {
      elename = "Emran hashmi songs";
    }
    if (elename === "Movies") {
      elename = "Bollywood movies";
    }
    try {
      const name = elename;
      const response = await fetch(
        `/api/filtervideos?elename=${name}&orderby=viewCount`
      );
      if (response.ok) {
        const videosData = await response.json();
        console.log(videosData);
        setVideoData(videosData.filterdata.items);
        setTimeout(() => {
          setdataloaded(false);
        }, 1000);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Show a loading screen until auth state is resolved
  if (authLoading) {
    return (
      <div
        style={{
          position: "fixed",
          zIndex: "101",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <ClipLoader color="blue" />
      </div>
    );
  }

  return (
    <div>
      {dataloading && (
        <div
          style={{
            position: "fixed",
            zIndex: "101",
            width: "100vw",
            height: "79vh",
            display: "flex",
            marginTop: "14vh",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <ClipLoader color="blue" />
        </div>
      )}
      <Header functionn={chipFilterTag} />
      <section
        style={{ height: "auto" }}
        className="flex overflow-hidden bg-[#000000] text-white w-full justify-center items-center"
      >
        <section
          style={{ minHeight: "80vh", marginTop: "11vh" }}
          className="w-full mt-10 mb-10 bg-[#0f0f0f] pt-10 pl-2 pr-2 grid justify-items-center items-center md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 grid-flow-row gap-4"
        >
          {!dataloading &&
            data.map((element, index) => (
              <Card key={index} element={element} />
            ))}
        </section>
      </section>
    </div>
  );
}

export default Homepagebody;
