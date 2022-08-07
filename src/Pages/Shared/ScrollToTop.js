import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { BsArrowUp } from "react-icons/bs";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    let scrolled = window.pageYOffset;
    if (scrolled > 500) {
      setVisible(true);
    } else if (scrolled <= 500) {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      className={`sticky left-[90%] bottom-[20%] z-[1000]  ${
        visible ? "inline" : "hidden"
      }`}
    >
      <HashLink to="/#top">
        <BsArrowUp className="absolute h-10 w-10 animate-bounce text-black" />
      </HashLink>
    </div>
  );
};

export default ScrollToTop;
