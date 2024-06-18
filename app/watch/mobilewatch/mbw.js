// MobileComponent.js
import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import Link from "next/link";

const MobileComponent = ({ vid }) => {
  const apikey = process.env.API_KEY;

  const [videoarr, setvideoarray] = useState([]);
  const [dataloaded, setdataloaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showdesc, setshowdesc] = useState(false);
  const [sugges, setsugges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setdataloaded(false);
      try {
        const dataa = await axios.get(`/api/videosfol?elename=${vid}`);
        setvideoarray(dataa.data.filterdata.items[0]);
        setdataloaded(true);
        getsuggestedvideos(dataa.data.filterdata.items[0].snippet.channelId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [vid]);

  const getsuggestedvideos = (e) => {
    const d = async (m) => {
      try {
        const data = await axios.get(`/api/suggestedvideos?cid=${m}`);
        setsugges(data.data.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    d(e);
  };

  const handleButtonClick = () => {
    setShowVideo(true);
  };
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <div style={{ height: "90vh" }}>
      <div
        style={{ height: "90vh" }}
        className="lg:hidden fixed bg-[#212121] w-full mt-10 flex justify-center items-center"
      >
        {!dataloaded && (
          <div
            style={{
              position: "fixed",
              zIndex: "101",
              width: "100vw",
              height: "90vh",
              display: "flex",
              marginTop: "6vh",
              marginBottom: "4vh",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <ClipLoader color="blue" />
          </div>
        )}
        <div className="p-2 w-full scrollingbarwatchpage h-full">
          <section className="suggested min-h-56 mt-5 w-full">
            <section className="videowatch w-full bg-[#212121] h-full">
              <section className="videodetailslanddesc w-full h-fit">
                {dataloaded ? (
                  !showVideo ? (
                    <div className="relative bg-black h-full w-full">
                      <img
                        src={videoarr?.snippet?.thumbnails?.maxres?.url}
                        alt="thumbnail"
                        className="w-full h-auto"
                      />
                      <button
                        className="absolute inset-0 mt-14 ml-40 flex items-center h-fit w-fit justify-center"
                        onClick={handleButtonClick}
                      >
                        <img
                          src="lg.svg"
                          height={35}
                          width={70}
                          alt="Play Button"
                        />
                      </button>
                    </div>
                  ) : (
                    <div className="h-full w-full bg-black">
                      <iframe
                        id={`youtube-player-mobile-${vid}`}
                        src={`https://www.youtube.com/embed/${vid}?autoplay=1&controls=1&modestbranding=1&rel=0&autohide=1`}
                        className="w-full h-60 border-black"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )
                ) : (
                  <></>
                )}
                <section className="w-full text-sm  bg-[#050505eb] h-fit text-white">
                  <h4 className="font-semibold text-sm">
                    {videoarr?.snippet?.title}
                  </h4>
                  <span className="flex text-xs text-orange-50 justify-between">
                    <b>{videoarr?.snippet?.channelTitle}</b>
                    <p>{formatDate(videoarr?.snippet?.publishedAt)}</p>
                  </span>
                </section>
                <section className="w-full text-sm h-fit pb-3 pt-3 bg-[#0a131dc2]">
                  <button
                    onClick={() => {
                      setshowdesc(!showdesc);
                    }}
                    className="bg-[#202d65a2] rounded-lg"
                  >
                    {showdesc ? "hide Description" : "Show Description"}
                  </button>
                  {showdesc && <p>{videoarr?.snippet?.description}</p>}
                </section>
              </section>
            </section>
          </section>
          <section className="suggested w-full flex justify-center items-center">
            <div
              style={{ minHeight: "95vh", height: "auto" }}
              className="scrollingbarwatchpage mt-7 h-auto gap-3 w-full"
            >
              <h2>Suggested Videos</h2>
              {sugges?.map((element, index) => {
                return (
                  <div key={index}>
                    <Link href={`/watch?q=${element?.id?.videoId}`}>
                      <div className="text-white text-sm bg-black mt-2 mb-4 w-full min-h-56">
                        <img
                          src={element?.snippet?.thumbnails?.high?.url}
                          className="w-full h-4/6"
                        />
                        <h4 className="font-semibold">
                          {element?.snippet?.title}
                        </h4>
                        <span className="flex text-xs justify-between w-full">
                          <b>{element?.snippet?.channelTitle}</b>
                          <p>{formatDate(videoarr?.snippet?.publishedAt)}</p>
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MobileComponent;
