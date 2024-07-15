import React, { useState} from "react";
import axios from "axios";
const MainPage = () => {
  const [URL, setURL] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [toggleCopyButton, setToggleCopyButton] = useState(false);
  const [toggleDisplayShortUrl, setToggleDisplayShortUrl] = useState(false);

  const handleOnChange = (e) => {
    setURL(e.target.value);
  };

  const fetchUrl = async () => {
    axios.defaults.withCredentials=true;
    try{

    
      await axios
        .post(
          "https://url-shortener-backend-taupe.vercel.app/url",
          { URL },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setShortUrl(data.shortUrl);
        });
      setToggleDisplayShortUrl(true);
    }
    catch(error){
      console.log(error);
    }
  };

  const handleCopyBtn = () => {
    let copyText = "https://url-shortener-backend-taupe.vercel.app/" + shortUrl;
    navigator.clipboard.writeText(copyText);
    setToggleCopyButton(true);
  };

  return (
    <div className=" w-full container h-screen bg-[#111827] text-white flex justify-center ">
      <div className=" mt-16 p-6 w-1/2 bg-[#1F2937] border-gray-600 shadow-[10px_10px_30px_#4B5563] border-2 h-[60%]  rounded-xl flex flex-col gap-4 items-center">
        <h1 className=" text-3xl font-bold"> Shorten Your URL</h1>
        <h2 className="text-xl">Shorten Your URL in just 1 click..</h2>
        <div className=" m-4 flex gap-4 justify-center w-full ">
          <input
            type="text"
            placeholder="Enter URL"
            onChange={handleOnChange}
            value={URL}
            className=" w-2/3 p-3 text-xl rounded-lg  border-2 
            border-gray-600 bg-transparent outline outline-0 
             placeholder-white   focus:border-gray-700"
          />
          <button
            onClick={fetchUrl}
            className=" text-lg w-1/5 py-3  px-7 bg-blue-700 hover:bg-blue-800 rounded-lg"
          >
            Shrink
          </button>
        </div>
        <div className="w-[90%] flex  justify-between items-center gap-2 border-gray-600 border-2 rounded-lg">
          <h3 className="text-base p-3 w-2/3">
            Short URL :{" "}
            {toggleDisplayShortUrl
              ? `https://url-shortener-backend-taupe.vercel.app/${shortUrl}`
              : "Your Short Url will appear here"}
          </h3>
          <button
            onClick={toggleDisplayShortUrl ? handleCopyBtn : null}
            className="text-lg  w-[22%] py-3 px-7 bg-blue-700  rounded-lg hover:bg-blue-800 items-stretch"
          >
            {toggleCopyButton ? "Copied !" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
