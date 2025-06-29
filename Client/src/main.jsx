import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalContextProvider } from "./context/GlobalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { AssessmentContextProvider } from "./context/AssessmentContext";
import { Toaster } from "./components/ui/sonner";

// TODO : show the skeletons on dashboard

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalContextProvider>
          <AssessmentContextProvider>
            <App />
            <Toaster richColors position="top-right" />
          </AssessmentContextProvider>
        </GlobalContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
