import React, { useState, useRef, useEffect } from "react";
import share_icon from "../../assets/share_icon.png";
import { model } from "../../model";


function ShareLinkButton() {
  const [visible, setVisible] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const popupRef = useRef(null);

  const handleClick = () => {
    const courseCodes = (model.favourites || []).map(course => course.code);
    const query = new URLSearchParams({ favs: courseCodes.join(",") });
    const url = `${window.location.origin}/#/share?${query.toString()}`;

    setShareUrl(url);
    setVisible(true);

    setTimeout(() => setVisible(false), 5000); // auto-close after 5 sec
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  // Close popup if user clicks outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);


  return (
    <div className="relative">
      <button
        onClick={handleClick}
        title="Share favourite courses"
        className="w-[44px] h-[44px] flex items-center justify-center rounded-full border border-[#003399] hover:bg-[#003399] transition-all duration-200"
      >
        <img src={share_icon} alt="Share" className="w-[20px] h-[20px] invert" />
      </button>

      {visible && (
        <div
          ref={popupRef}
          className="absolute top-[110%] right-0 z-10 bg-white shadow-lg rounded-xl p-4 w-[280px] border border-gray-200"
        >
          <p className="text-sm mb-2 break-words">{shareUrl}</p>
          <button
            onClick={handleCopy}
            className="w-full bg-[#0052cc] text-white text-sm py-1 rounded-lg hover:bg-[#003399] transition"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}


export default ShareLinkButton;
