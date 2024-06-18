import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const DesktopComponent = ({ vid }) => {
  const [videoarr, setvideoarray] = useState([]);
  const [dataloaded, setdataloaded] = useState(false);
  const [dataloaded2, setdataloaded2] = useState(false);
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

  const handleButtonClick = () => {
    setShowVideo(true);
  };

  const getsuggestedvideos = (e) => {
    const d = async (m) => {
      setdataloaded2(false);
      try {
        const data = await axios.get(`/api/suggestedvideos?cid=${m}`);
        setsugges(data.data.data.items);
        setdataloaded2(true);
      } catch (error) {
        console.log(error);
      }
    };
    d(e);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <div
      className="hidden lg:flex md:flex w-full gap-4 bg-[#212121]"
      style={{ height: "93vh" }}
    >
      {!dataloaded && !dataloaded2 && (
        <div
          style={{
            position: "fixed",
            zIndex: "101",
            width: "100vw",
            height: "85vh",
            display: "flex",
            marginTop: "7vh",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <ClipLoader color="blue" />
        </div>
      )}
      <section className="videowatch w-8/12 bg-[#212121] h-full mt-14">
        <section
          style={{ minHeight: "85vh" }}
          className="hidden videodetailslanddesc bg-black w-full lg:flex md:flex lg:flex-col mg:flex-col justify-center items-center"
        >
          {dataloaded ? (
            !showVideo ? (
              <div className="relative w-11/12">
                <img
                  src={videoarr?.snippet?.thumbnails?.maxres?.url}
                  alt="thumbnail"
                  className="w-full h-auto"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={handleButtonClick}
                >
                  <img src="lg.svg" height={35} width={70} alt="Play Button" />
                </button>
              </div>
            ) : (
              <iframe
                id={`youtube-player-large-${vid}`}
                src={`https://www.youtube.com/embed/${vid}?autoplay=1&controls=1&modestbranding=1&rel=0&autohide=1`}
                className="w-11/12 h-96 border-black"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )
          ) : (
            <></>
          )}
          <section className="w-11/12  bg-[#050505eb] h-fit text-white">
            <h4 className="font-semibold">{videoarr?.snippet?.title}</h4>
            <span className="flex justify-between">
              <b>{videoarr?.snippet?.channelTitle}</b>
              <p>{formatDate(videoarr?.snippet?.publishedAt)}</p>
            </span>
          </section>
          <section
            onMouseLeave={() => {
              setshowdesc(false);
            }}
            className="w-11/12 h-auto mb-6 bg-[#0a131dc2]"
          >
            <button
              onClick={() => {
                setshowdesc(!showdesc);
              }}
              className="bg-[#202d65a2] mt-10 mb-8 rounded-lg"
            >
              {showdesc ? "hide Description" : "Show Description"}
            </button>
            {showdesc && <p>{videoarr?.snippet?.description}</p>}
          </section>
        </section>
      </section>
      <section className="scrollingbarwatchpage lg:flex-col min-h-11/12 w-4/12 h-auto bg-[#212121] mt-14 justify-center items-center">
        <div style={{ minHeight: "100vh" }} className="gap-3 w-full">
          <h2>Suggested Videos</h2>
          {sugges?.map((element, index) => {
            return (
              <div
                className="text-white bg-black mt-2 mr-12 mb-4 w-5/6 min-h-56"
                key={index}
              >
                <img
                  src={element?.snippet?.thumbnails?.high?.url}
                  className="w-full h-56"
                />
                <h4 className="font-semibold">{element?.snippet?.title}</h4>
                <span className="flex text-xs justify-between w-full">
                  <b>{element?.snippet?.channelTitle}</b>
                  <p>{formatDate(videoarr?.snippet?.publishedAt)}</p>
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DesktopComponent;
