import React from "react";
import share_icon from "../../assets/share_icon.png";
import { model } from "../../model";

/**
 * Generates a shareable link containing the current favourite course codes.
 * Copies the link to the clipboard and alerts the user.
 */
function ShareLinkButton() {
  const handleClick = () => {
    const courseCodes = (model.favourites || []).map(course => course.code);
    const query = new URLSearchParams({ favs: courseCodes.join(",") });

    // ✅ Use hash routing format
    const shareUrl = `${window.location.origin}/#/share?${query.toString()}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      alert(`Link copied to clipboard:\n${shareUrl}`);
    });
  };

  return (
    <button onClick={handleClick} title="Share favourite courses">
      <img
        src={share_icon}
        alt="Share"
        className="w-[28px] h-[28px] cursor-pointer hover:opacity-70 transition"
      />
    </button>
  );
}

export default ShareLinkButton;
