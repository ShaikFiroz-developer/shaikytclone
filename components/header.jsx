"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import speechrecog from "@/util/speecgrecognition";
import { usePathname, useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import "../app/globals.css";

function Header({ functionn }) {
  const router = useRouter();

  const [chipfilters, setChipfilters] = useState([]);
  const [buttonhovered, setbuttonhovered] = useState(false);
  const [filteraddvalue, setfilteraddvalue] = useState("");
  const [inpuvalue, setinputvalue] = useState("");
  const [changevalue, setchangeinputext] = useState("");
  const currentPage = usePathname();
  const [category, setfiltername] = useState("Film & Animation");
  const [dataloaded, setdataloaded] = useState(false);

  const handleAddFilter = () => {
    if (filteraddvalue.trim() !== "") {
      setChipfilters((prevFilters) => [...prevFilters, filteraddvalue.trim()]);
      setfilteraddvalue("");
      setbuttonhovered(false);
    }
  };

  useEffect(() => {
    const fetchChipfiltersData = () => {
      fetch("/api/videoss")
        .then((response) => response.json())
        .then((data) => {
          setChipfilters(data.filterdata);
          setdataloaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchChipfiltersData();
  }, []);

  const handlesubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Form submitted!"); // Check if this message appears in the console
    if (changevalue.trim() !== "") {
      router.push(`/search?q=${changevalue}`);
    }
  };
  const handlechipfilterclick = (e) => {
    setfiltername(e?.snippet?.title);
  };

  useEffect(() => {
    functionn(category);
  }, [category]);

  useEffect(() => {
    const pushsearch = () => {
      const inputBox = document.getElementById("searchinputbox");
      inputBox.value = inpuvalue;
      router.push(`/search?q=${inpuvalue}`);
    };
    if (inpuvalue.trim() !== "") pushsearch();
  }, [inpuvalue, router]);

  return (
    <div
      className="w-full"
      style={{ fontSize: "14px", position: "fixed", top: "0", zIndex: "100" }}
    >
      {!dataloaded && (
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
      )}

      {
        /*show for only home pages*/
        currentPage == "/" && (
          <div
            style={{ borderBottom: "2px solid #190c0c" }}
            className=" w-full mt-12  bg-[#212121] h-13"
          >
            <div className="scrollbarchps pl-5 pr-5 w-full bg-[#212121] flex gap-3 ">
              {chipfilters?.map((element, index) => (
                <button
                  className="h-9 bg-[#000000] font-semibold p-2 mt-3 text-sm min-w-fit   rounded-lg text-white hover:bg-[#0800ff]"
                  type="button"
                  key={index}
                  onClick={() => {
                    handlechipfilterclick(element);
                  }}
                  style={{
                    ...(category === `${element?.snippet?.title}` && {
                      backgroundColor: "#0800ff",
                    }),
                  }}
                >
                  <p>{element?.snippet?.title}</p>
                </button>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Header;
