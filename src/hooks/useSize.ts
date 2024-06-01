import { useEffect, useState } from "react";
const useSize = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const windowSizeHandler = () => {
      console.log("are");
      if (window.innerWidth > 768) {
        setWindowSize(Math.ceil(window.innerWidth / 305));
      } else {
        setWindowSize(Math.ceil(window.innerWidth / 170));
      }
    };
    window.addEventListener("resize", windowSizeHandler);

    windowSizeHandler();

    return () => {
      window.removeEventListener("resize", windowSizeHandler);
    };
  });

  return windowSize;
};

export default useSize;
