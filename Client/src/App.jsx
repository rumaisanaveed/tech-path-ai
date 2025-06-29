import { useEffect, useState } from "react";
import "./App.css";
import { SplashScreen } from "./pages/splash/SplashScreen";
import Router from "./Router";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <SplashScreen /> : <Router />;
}

export default App;
