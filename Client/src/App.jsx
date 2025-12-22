import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { FullPageLoader } from "./pages/fullPageLoader/FullPageLoader";
import { getRoutes } from "./routes";

function App() {
  const router = getRoutes();

  return (
    <Suspense fallback={<FullPageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
