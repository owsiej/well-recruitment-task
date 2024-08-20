import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { AppointmentProvider } from "./context/appointmentsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppointmentProvider>
      <App />
    </AppointmentProvider>
  </StrictMode>
);
