import React from "react";
import share_icon from "../assets/share_icon.png";

function ShareLinkButton( { shareUrl, visible, generateShareUrl, handleCopy, popupRef }) {

  return (
    <div className="relative">
      <button
        onClick={generateShareUrl} // Call the presenter method to generate the link
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
            onClick={handleCopy} // Call the presenter method to copy the URL
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
