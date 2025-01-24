"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Searchpagecards from "../utils/searchpagecards";
import { ClipLoader } from "react-spinners";
import Header1 from "@/components/head";
import Footer from "@/components/footer";

function SearchContent() {
  const [search, setSearch] = useState(null); // Holds the search query
  const [videoData, setVideoData] = useState([]); // Holds the fetched video data
  const [dataLoaded, setDataLoaded] = useState(false); // Controls loader visibility
  const searchParams = useSearchParams();

  // Extracting the search query from URL parameters
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) setSearch(query);
  }, [searchParams]);

  // Fetching video data when the search query updates
  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setDataLoaded(false); // Show loader before starting the fetch
        try {
          const response = await fetch(
            `/api/filtervideos?elename=${search}&orderby=relevance`
          );

          if (response.ok) {
            const videosData = await response.json();
            setVideoData(videosData.filterdata.items); // Update video data
          } else {
            console.error("Error fetching data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setDataLoaded(true); // Hide loader after fetching is complete
        }
      }
    };

    fetchData();
  }, [search]);

  return (
    <div>
      <Header1 />
      {/* Loader - Visible only when data is being fetched */}
      {!dataLoaded && (
        <div
          style={{
            position: "fixed",
            top: "0",
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
      )}

      {/* Video Content Section */}
      <div
        style={{ height: "86" }}
        className="scrollbarchps mt-10 h-11/12 flex items-center justify-center gap-4 bg-[#111416cb] w-full"
      >
        {dataLoaded && videoData.length > 0 ? (
          <div className="w-full pl-5 pr-5">
            {videoData.map((video, index) => (
              <div className="w-full mt-5 mb-14" key={index}>
                <Searchpagecards element={video} />
              </div>
            ))}
          </div>
        ) : (
          dataLoaded && (
            <div className="text-white text-center">
              No videos found for your search query.
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

function Search() {
  return (
    <Suspense fallback={<ClipLoader color="blue" />}>
      <SearchContent />
    </Suspense>
  );
}

export default Search;
