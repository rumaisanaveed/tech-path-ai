import React, { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const isSmallScreen = screenSize < 600;
  const isMediumScreen = screenSize <= 768;
  const isLargeScreen = screenSize <= 1100;

  return { screenSize, isSmallScreen, isMediumScreen, isLargeScreen };
};
