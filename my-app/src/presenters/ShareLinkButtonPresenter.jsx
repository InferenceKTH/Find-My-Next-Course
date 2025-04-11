import { observer } from "mobx-react-lite";
import { useState, useEffect, useRef } from "react";
import ShareLinkButton from "../views/ShareLinkButton"

export const ShareLinkPresenter = observer((props) => {
    console.log("ShareLinkButton rendered"); 
  const [shareUrl, setShareUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const popupRef = useRef(null);


  const generateShareUrl = () => {
    console.log("generateShareUrl clicked"); 
    const courseCodes = (props.model.favourites || []).map(course => course.code);
    const query = new URLSearchParams({ favs: courseCodes.join(",") });
    const url = `${window.location.origin}/#/share?${query.toString()}`;
    setShareUrl(url);
    setVisible(true);
    
    setTimeout(() => setVisible(false), 5000); // auto-close after 5 sec
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
  };


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return  <ShareLinkButton
    shareUrl={shareUrl}
    visible={visible} 
    generateShareUrl={generateShareUrl}
    handleCopy={handleCopy}
    popupRef={popupRef}/>;
    

});

