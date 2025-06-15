import { useEffect } from "react";

const usePageTitle = (pageTitle = "") => {
  useEffect(() => {
    const fullTitle = `Career Mentor${pageTitle ? " - " + pageTitle : ""}`;
    document.title = fullTitle;
  }, [pageTitle]);
};

export default usePageTitle;
