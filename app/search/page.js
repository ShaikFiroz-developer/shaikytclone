"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header1 from "@/components/head";
import Footer from "@/components/footer";
import Searchpagecards from "../utils/searchpagecards";
import { ClipLoader } from "react-spinners";

function Search() {
  const [search, setSearch] = useState(null);
  const [videoData, setVideoData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const params = useSearchParams();
    setSearch(params.get("q"));
  }, []);

  useEffect(() => {
    if (search) {
      setDataLoaded(false);
      const chipFilterTag = async (elename) => {
        try {
          const response = await fetch(
            `/api/filtervideos?elename=${elename}&orderby=relevance`
          );
          if (response.ok) {
            setDataLoaded(true);
            const videosData = await response.json();
            setVideoData(videosData.filterdata.items);
          } else {
            console.error("Error fetching data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      chipFilterTag(search);
    }
  }, [search]);

  return (
    <div>
      <div>
        {!dataLoaded && (
          <div
            style={{
              position: "fixed",
              zIndex: "101",
              width: "100vw",
              height: "88vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <ClipLoader color="blue" />
          </div>
        )}

        <div
          style={{ height: "86" }}
          className="scrollbarchps mt-10 h-11/12 flex items-center justify-center gap-4 bg-[#111416cb] w-full"
        >
          {dataLoaded && (
            <div className="w-full pl-5 pr-5">
              {videoData?.map((video, index) => {
                return (
                  <div className="w-full  mt-5 mb-14" key={index}>
                    <Searchpagecards element={video} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
